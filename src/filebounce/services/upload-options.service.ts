import { Injectable } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { Store } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { UploadTrigger } from 'filebounce/models/upload-options.state';
import { getUploadOptions } from 'filebounce/store/app.selectors';
import {
  getTrigger, getWaitSeconds, getMinRecipients, getUploadOptionsSubmitted,
} from 'filebounce/store/upload-options/upload-options.selectors';
import * as actions from 'filebounce/store/upload-options/upload-options.actions';

@Injectable()
export class UploadOptionsService {
  getUploadTrigger() {
    return this._store.let(compose(
      getTrigger(),
      getUploadOptions()
    ));
  }

  getWaitSeconds() {
    return this._store.let(compose(
      getWaitSeconds(),
      getUploadOptions()
    ));
  }

  getMinRecipients() {
    return this._store.let(compose(
      getMinRecipients(),
      getUploadOptions()
    ));
  }

  getUploadOptionsSubmitted() {
    return this._store.let(compose(
      getUploadOptionsSubmitted(),
      getUploadOptions()
    ));
  }

  setUploadTrigger(trigger: UploadTrigger) {
    this._store.dispatch(new actions.SetTriggerAction({trigger}));
  }

  setWaitSeconds(waitSeconds: number) {
    this._store.dispatch(new actions.SetWaitSecondsAction({waitSeconds}));
  }

  setMinRecipients(minRecipients: number) {
    this._store.dispatch(new actions.SetMinRecipientsAction({minRecipients}));
  }

  uploadOptionsSubmitted() {
    this._store.dispatch(new actions.UploadOptionsSubmittedAction());
  }

  constructor(private _store: Store<AppState>) {}
}
