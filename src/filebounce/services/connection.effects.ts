import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { TransferNodeConnectionService } from 'filebounce/net';
import * as fileActions from 'filebounce/store/file/file.actions';
import { UploadTrigger } from 'filebounce/models/upload-options.state';
import * as uploadOptionsActions from 'filebounce/store/upload-options/upload-options.actions';

@Injectable()
export class ConnectionEffects {
  constructor(
    private actions$: Actions,
    private connectionService: TransferNodeConnectionService,
  ) {}

  @Effect() disconnectOnFileClear$ = this.actions$
    .ofType(fileActions.ClearSelectedFileAction.type)
    .do(() => this.connectionService.socketDisconnect())
    .flatMap(() => Observable.empty());

  @Effect() connectOnFileConfirm$ = this.actions$
    .ofType(fileActions.ConfirmSelectedFileAction.type)
    .do(() => this.connectionService.socketReconnect())
    .flatMap(() => Observable.from([
      new uploadOptionsActions.SetTriggerAction({trigger: UploadTrigger.WaitForRecipients}),
      new uploadOptionsActions.SetMinRecipientsAction({minRecipients: 1}),
      new uploadOptionsActions.UploadOptionsSubmittedAction(),
    ]));
}
