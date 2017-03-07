import { Injectable } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { Store } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { getUploadProgress } from 'filebounce/store/app.selectors';
import {
  getUploadId, getRecipients, getBytesUploaded,
} from 'filebounce/store/upload-progress/upload-progress.selectors';

@Injectable()
export class UploadProgressService {
  getUploadId() {
    return this._store.let(compose(
      getUploadId(),
      getUploadProgress()
    ));
  }

  getRecipients() {
    return this._store.let(compose(
      getRecipients(),
      getUploadProgress()
    ));
  }

  getBytesUploaded() {
    return this._store.let(compose(
      getBytesUploaded(),
      getUploadProgress()
    ));
  }

  constructor(private _store: Store<AppState>) {}
}
