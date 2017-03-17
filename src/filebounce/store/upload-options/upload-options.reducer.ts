import { Action, ActionReducer } from '@ngrx/store';

import { UploadOptions } from 'filebounce/models/upload-options.state';
import {
  SetTriggerAction, SetWaitSecondsAction, SetMinRecipientsAction,
  UploadOptionsSubmittedAction, SetWaitSecondsRemainingAction,
} from './upload-options.actions';

function _uploadOptionsReducer(state = new UploadOptions(), action: Action): UploadOptions {
  switch (action.type) {
    case SetTriggerAction.type: {
      let trigger = (<SetTriggerAction>action).payload.trigger;
      state = state.setTrigger(trigger);
      break;
    }

    case SetWaitSecondsAction.type: {
      let seconds = (<SetWaitSecondsAction>action).payload.waitSeconds;
      state = state.setWaitSeconds(seconds);
      break;
    }

    case SetWaitSecondsRemainingAction.type: {
      let seconds =  (<SetWaitSecondsRemainingAction>action).payload.waitSecondsRemaining;
      state = state.setWaitSecondsRemaining(seconds);
      break;
    }

    case SetMinRecipientsAction.type: {
      let minRecipients = (<SetMinRecipientsAction>action).payload.minRecipients;
      state = state.setMinRecipients(minRecipients);
      break;
    }

    case UploadOptionsSubmittedAction.type: {
      state = state.setOptionsSubmitted(true);
      break;
    }
  }
  return state;
}

export const uploadOptionsReducer: ActionReducer<UploadOptions> = _uploadOptionsReducer;
