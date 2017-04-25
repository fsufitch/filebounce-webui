import { ActionReducer } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { fileStateReducer } from './file/file.reducer';
import { uploadOptionsReducer } from './upload-options/upload-options.reducer';
import { uploadProgressReducer } from './upload-progress/upload-progress.reducer';
import * as appActions from './app.actions';

export const appStateReducer: ActionReducer<AppState> = (state = new AppState(), action) => {
  switch (action.type) {
    case (appActions.SetSimpleUIStageAction.type): {
      let stage = (<appActions.SetSimpleUIStageAction>action).payload.stage;
      state = <AppState>state.set('simpleUIStage', stage);
      break;
    }
    case (appActions.SetAuthenticationAction.type): {
      let auth = (<appActions.SetAuthenticationAction>action).payload.authentication;
      state = <AppState>state.set('authentication', auth);
      break;
    }
    default: {
      state = <AppState>state.merge({
        file: fileStateReducer(state.file, action),
        uploadOptions: uploadOptionsReducer(state.uploadOptions, action),
        uploadProgress: uploadProgressReducer(state.uploadProgress, action),
      });
    }
  }
  return state;
};
