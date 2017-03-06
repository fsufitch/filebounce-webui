import { Action, ActionReducer } from '@ngrx/store';

import { UploadStep } from 'filebounce/models/upload.state';

function _uploadStepReducer(state = new UploadStep(), action: Action): UploadStep {
  switch (action.type) {

  }
  return state;
}

export const fileStateReducer: ActionReducer<UploadStep> = _uploadStepReducer;
