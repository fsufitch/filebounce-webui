import { ActionReducer } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { fileStateReducer } from 'filebounce/store/file/file.reducer';

export const appStateReducer: ActionReducer<AppState> = (state = new AppState(), action) => {
  return <AppState>state.merge({
    file: fileStateReducer(state.file, action),
  });
};
