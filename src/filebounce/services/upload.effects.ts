import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { FileService } from './file.service';
import { ConfirmSelectedFileAction } from 'filebounce/store/file/file.actions';
import { ClientMessaging } from 'filebounce/protobufs';
import { MessageEmitService } from 'filebounce/net';


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
    .flatMap(() => Observable.of());

  constructor(
    private _actions$: Actions,
    private _fileService: FileService,
    private _messageEmitService: MessageEmitService,
  ) {}
}
