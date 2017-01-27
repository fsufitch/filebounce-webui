import { Injectable } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { Store } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { getFileState } from 'filebounce/store/app.selectors';
import { getSelectedFile, getFileConfirmed } from 'filebounce/store/file/file.selectors';
import * as fileActions from 'filebounce/store/file/file.actions';

@Injectable()
export class FileService {
  constructor(private _store: Store<AppState>) {}

  getSelectedFile() {
    return compose(
      getSelectedFile(),
      getFileState()
    )(this._store);
  }

  getFileConfirmed() {
    return compose(
      getFileConfirmed(),
      getFileState()
    )(this._store);
  }

  setFile(file: File) {
    this._store.dispatch(new fileActions.SetSelectedFileAction({file}));
  }

  confirmFile() {
    this._store.dispatch(new fileActions.ConfirmSelectedFileAction());
  }

  clearFile() {
    this._store.dispatch(new fileActions.ClearSelectedFileAction());
  }
}
