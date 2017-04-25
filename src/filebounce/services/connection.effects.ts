import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Authentication } from 'filebounce/models/app.state';
import { TransferNodeConnectionService, MessageEmitService } from 'filebounce/net';
import * as fileActions from 'filebounce/store/file/file.actions';
import { UploadTrigger } from 'filebounce/models/upload-options.state';
import * as uploadOptionsActions from 'filebounce/store/upload-options/upload-options.actions';
import * as appActions from 'filebounce/store/app.actions';

@Injectable()
export class ConnectionEffects {
  constructor(
    private _actions$: Actions,
    private _connectionService: TransferNodeConnectionService,
    private _messageEmitService: MessageEmitService,
  ) {}

  @Effect() disconnectOnFileClear$ = this._actions$
    .ofType(fileActions.ClearSelectedFileAction.type)
    .do(() => this._connectionService.socketDisconnect())
    .flatMap(() => Observable.empty());

  @Effect() connectOnFileConfirm$ = this._actions$
    .ofType(fileActions.ConfirmSelectedFileAction.type)
    .do(() => this._connectionService.socketReconnect())
    .map(() => new appActions.SendAuthenticationAction({authKey: 'xxx'})); // TODO: un-stub auth

  @Effect() sendUploadOptionsOnSuccessfulAuth$ = this._actions$
    .ofType(appActions.SetAuthenticationAction.type)
    .map(action => (<appActions.SetAuthenticationAction>action))
    .filter(action => action.payload.authentication === Authentication.Success)
    .flatMap(() => Observable.from([
      new uploadOptionsActions.SetTriggerAction({trigger: UploadTrigger.WaitForRecipients}),
      new uploadOptionsActions.SetMinRecipientsAction({minRecipients: 1}),
      new uploadOptionsActions.UploadOptionsSubmittedAction(),
    ]));
}
