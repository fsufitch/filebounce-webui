import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as Long from 'long';

import { FileService } from './file.service';
import { ConfirmSelectedFileAction } from 'filebounce/store/file/file.actions';
import { SetUIStepAction } from 'filebounce/store/app.actions';
import {
  SetUploadIdAction, SetRecipientsAction, SetBytesUploadedAction,
  SetFileReadOffsetAction, ProcessMoreDataRequestAction, SetMoreDataRequestAction,
  UploadChunkAction,
} from 'filebounce/store/upload-progress/upload-progress.actions';
import { UIStep } from 'filebounce/models/app.state';
import { Recipient } from 'filebounce/models/recipient.model';
import { MessageEmitService, MessageMuxService } from 'filebounce/net';
import { UploadProgressService } from 'filebounce/services/upload-progress.service';


@Injectable()
export class UploadEffects {
  @Effect() sendFileMetadata$ = this._actions$
    .ofType(ConfirmSelectedFileAction.type)
    .switchMap(() => this._fileService.getSelectedFile().take(1))
    .map(file => ({
      filename: file.name,
      mimetype: file.type,
      size: file.size,
    }))
    .do(({filename, mimetype, size}) => this._messageEmitService.sendFileMetadata(filename, mimetype, size))
    .map(() => new SetUIStepAction({step: UIStep.SelectOptions}));

  @Effect() receiveTransferCreatedData$ = this._messageMuxService
    .getTransferCreatedMessages()
    .map(message => message.transferCreatedData)
    .map(({transferId, requestChunks, chunkSize}) => ({
      uploadId: transferId,
      chunks: Long.fromValue(requestChunks).toNumber(),
      chunkSize: Long.fromValue(chunkSize).toNumber(),
    }))
    .flatMap(({uploadId, chunks, chunkSize}) => Observable.from([
      new SetUploadIdAction({uploadId}),
      new SetMoreDataRequestAction({chunks, chunkSize}),
    ]));

  @Effect() receiveRecipientData$ = this._messageMuxService
    .getRecipientsMessages()
    .map(message => message.recipientsData.recipients)
    .map(recipients => recipients.map(r => <Recipient>r))
    .map(recipients => new SetRecipientsAction({recipients}));

  @Effect() startUpload$ = this._actions$
    .ofType(SetUIStepAction.type)
    .map(action => <SetUIStepAction>action)
    .filter(action => action.payload.step === UIStep.Uploading)
    .flatMap(() => Observable.from([
      new SetBytesUploadedAction({bytes: 0}),
      new SetFileReadOffsetAction({offset: 0}),
      new ProcessMoreDataRequestAction(),
    ]));

  @Effect() processMoreDataRequest$ = this._actions$
    .ofType(ProcessMoreDataRequestAction.type)
    .flatMap(() => this._uploadProgressService.getMoreDataRequest().take(1))
    .map(({requestedChunks, requestedChunkSize}) => {
      let actions: UploadChunkAction[] = [];
      for (let i = 0; i < requestedChunks; i++) {
        actions.push(new UploadChunkAction({bytes: requestedChunkSize}));
      }
      return actions;
    })
    .flatMap(actions => Observable.from(actions));

  private _readChunk$ = this._actions$
    .ofType(UploadChunkAction.type)
    .map(action => (<UploadChunkAction>action).payload.bytes)
    .withLatestFrom(
      this._uploadProgressService.getFileReadOffset(),
      this._fileService.getSelectedFile(),
      (bytes, offset, file) => ({bytes, offset, file})
    )
    .map(({bytes, offset, file}) => ({
      offset,
      order: Math.floor(offset / bytes),
      data: file.slice(offset, offset + bytes),
    }))
    .share();

  @Effect() uploadChunk$ = this._readChunk$
    .filter(({data}) => data.size > 0)
    .do(({order, data}) => this._messageEmitService.sendFileData(data, order))
    .map(({offset, data}) => new SetFileReadOffsetAction({offset: offset + data.size}));

  @Effect() uploadComplete$ = this._fileService
    .getSelectedFile()
    .switchMap(file => this._readChunk$
      .filter(({data}) => data.size === 0)
      .take(1)
    )
    .map(() => new SetUIStepAction({step: UIStep.UploadComplete}));

  @Effect() receiveProgressData$ = this._messageMuxService
    .getProgressMessages()
    .map(message => message.progressData)
    .map(({bytesUploaded, requestChunks, chunkSize}) => ({
      bytes: Long.fromValue(bytesUploaded).toNumber(),
      chunks: Long.fromValue(requestChunks).toNumber(),
      chunkSize: Long.fromValue(chunkSize).toNumber(),
    }))
    .flatMap(({bytes, chunks, chunkSize}) => Observable.from([
      new SetBytesUploadedAction({bytes}),
      new SetMoreDataRequestAction({chunks, chunkSize}),
      new ProcessMoreDataRequestAction(),
    ]));

  constructor(
    private _actions$: Actions,
    private _fileService: FileService,
    private _messageEmitService: MessageEmitService,
    private _messageMuxService: MessageMuxService,
    private _uploadProgressService: UploadProgressService
  ) {}
}
