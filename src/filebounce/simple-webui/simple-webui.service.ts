import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { getSimpleUIStage } from 'filebounce/store/app.selectors';

@Injectable()
export class SimpleWebUIService {

  getSimpleUIStage() {
    return this._store.let(getSimpleUIStage());
  }

  constructor(private _store: Store<AppState>) {}
}
