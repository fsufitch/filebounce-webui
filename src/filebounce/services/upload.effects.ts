import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { FileService } from './file.service';
import { ConfirmSelectedFileAction } from 'filebounce/store/file/file.actions';
import { SetUIStepAction } from 'filebounce/store/app.actions';
import { UIStep } from 'filebounce/models/app.state';
import { MessageEmitService, MessageMuxService } from 'filebounce/net';


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
    .do(data => console.debug('received transfer created data', data))
    .flatMap(() => Observable.of());

  constructor(
    private _actions$: Actions,
    private _fileService: FileService,
    private _messageEmitService: MessageEmitService,
    private _messageMuxService: MessageMuxService
  ) {}
}
