import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { SimpleUIStage } from 'filebounce/models/app.state';
import { UploadTrigger } from 'filebounce/models/upload-options.state';
import { UploadOptionsService } from './upload-options.service';
import { UploadProgressService } from './upload-progress.service';
import * as appActions from 'filebounce/store/app.actions';
import * as uploadOptionsActions from 'filebounce/store/upload-options/upload-options.actions';
import * as uploadProgressActions from 'filebounce/store/upload-progress/upload-progress.actions';

@Injectable()
export class UploadOptionsEffects {
  private _uploadOptionsSubmitted$ = this._actions$
    .ofType(uploadOptionsActions.UploadOptionsSubmittedAction.type)
    .withLatestFrom(
      this._uploadOptionsService.getUploadTrigger(),
      this._uploadOptionsService.getWaitSeconds(),
      this._uploadOptionsService.getMinRecipients(),
      (action, trigger, waitSeconds, minRecipients) => ({trigger, waitSeconds, minRecipients})
    );

  // @Effect() manualUploadNextStep$ = this._uploadOptionsSubmitted$
  //   .filter(({trigger}) => trigger === UploadTrigger.Manual)
  //   .map(() => new appActions.SetUIStepAction({step: UIStep.Uploading}));

  @Effect() minRecipientsNextStep$ = this._uploadOptionsSubmitted$
    .filter(({trigger}) => trigger === UploadTrigger.WaitForRecipients)
    .switchMap(({minRecipients}) => this._uploadProgressService.getRecipients()
        .map(list => list.size >= minRecipients)
    )
    .filter(enoughRecipients => enoughRecipients)
    .flatMap(() => Observable.from([
      new appActions.SetSimpleUIStageAction({stage: SimpleUIStage.UploadInProgress}),
      new uploadProgressActions.StartUploadAction(),
    ]));

  // private _waitSecondsRemaining$ = this._uploadOptionsSubmitted$
  //   .filter(({trigger}) => trigger === UploadTrigger.Timer)
  //   .switchMap(({waitSeconds}) => Observable.timer(0, 1000)
  //     .scan((secondsRemaining) => secondsRemaining - 1, waitSeconds + 1)
  //     .takeWhile(secondsRemaining => secondsRemaining >= 0)
  //   );
  //
  // @Effect() setWaitSecondsRemaining$ = this._waitSecondsRemaining$
  //   .map(waitSecondsRemaining => new uploadOptionsActions.SetWaitSecondsRemainingAction({waitSecondsRemaining}));

  // @Effect() waitSecondsNextStep$ = this._waitSecondsRemaining$
  //   .filter(seconds => seconds === 0)
  //   .map(() => new appActions.SetUIStepAction({step: UIStep.Uploading}));

  constructor(
    private _actions$: Actions,
    private _uploadOptionsService: UploadOptionsService,
    private _uploadProgressService: UploadProgressService
  ) {}
}
