import { ActionReducer } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { fileStateReducer } from './file/file.reducer';
import { uploadOptionsReducer } from './upload-options/upload-options.reducer';
import { uploadProgressReducer } from './upload-progress/upload-progress.reducer';
// import { SetUIStepAction } from './app.actions';

export const appStateReducer: ActionReducer<AppState> = (state = new AppState(), action) => {
  switch (action.type) {
    // case (SetUIStepAction.type): {
    //   let step = (<SetUIStepAction>action).payload.step;
    //   break;
    // }
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
