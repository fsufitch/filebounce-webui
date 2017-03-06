import { ActionReducer } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
import { fileStateReducer } from 'filebounce/store/file/file.reducer';
import { SetUIStepAction } from './app.actions';

export const appStateReducer: ActionReducer<AppState> = (state = new AppState(), action) => {
  switch (action.type) {
    case (SetUIStepAction.type): {
      let step = (<SetUIStepAction>action).payload.step;
      state = state.setStep(step);
      break;
    }
    default: {
      state = <AppState>state.merge({
        file: fileStateReducer(state.file, action),
      });
    }
  }
  return state;
};
