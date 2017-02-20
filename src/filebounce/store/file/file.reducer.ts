import { Action, ActionReducer } from '@ngrx/store';

import { SelectFileStep } from 'filebounce/models/file.state';
import {
  ClearSelectedFileAction, SetSelectedFileAction, ConfirmSelectedFileAction,
} from './file.actions';

function _fileStateReducer(state = new SelectFileStep(), action: Action): SelectFileStep {
  switch (action.type) {
    case ClearSelectedFileAction.type: {
      state = state.clear();
      break;
    }
    case SetSelectedFileAction.type: {
      let file = (<SetSelectedFileAction>action).payload.file;
      state = state.setFile(file);
      break;
    }
    case ConfirmSelectedFileAction.type: {
      state = state.confirm();
      break;
    }
  }
  return state;
}

export const fileStateReducer: ActionReducer<SelectFileStep> = _fileStateReducer;
