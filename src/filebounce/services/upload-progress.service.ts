import { Injectable } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { Store } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { getUploadProgress } from 'filebounce/store/app.selectors';
import {
  getUploadId, getRecipients, getBytesUploaded, getMoreDataRequest,
  getFileReadOffset,
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

  getMoreDataRequest() {
    return this._store.let(compose(
      getMoreDataRequest(),
      getUploadProgress()
    ));
  }

  getFileReadOffset() {
    return this._store.let(compose(
      getFileReadOffset(),
      getUploadProgress()
    ));
  }

  constructor(private _store: Store<AppState>) {}
}
