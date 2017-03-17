import { Action, ActionReducer } from '@ngrx/store';

import { UploadProgress } from 'filebounce/models/upload-progress.state';
import {
  SetUploadIdAction, SetRecipientsAction, SetBytesUploadedAction,
  SetMoreDataRequestAction, SetFileReadOffsetAction,
} from './upload-progress.actions';

function _uploadProgressReducer(state = new UploadProgress(), action: Action): UploadProgress {
  switch (action.type) {
    case SetUploadIdAction.type: {
      let uploadId = (<SetUploadIdAction>action).payload.uploadId;
      state = state.setUploadId(uploadId);
      break;
    }

    case SetRecipientsAction.type: {
      let recipients = (<SetRecipientsAction>action).payload.recipients;
      state = state.setRecipients(recipients);
      break;
    }

    case SetBytesUploadedAction.type: {
      let bytes = (<SetBytesUploadedAction>action).payload.bytes;
      state = state.setBytesUploaded(bytes);
      break;
    }

    case SetMoreDataRequestAction.type: {
      let {chunks, chunkSize} = (<SetMoreDataRequestAction>action).payload;
      state = state.setMoreDataRequest(chunks, chunkSize);
      break;
    }

    case SetFileReadOffsetAction.type: {
      let offset = (<SetFileReadOffsetAction>action).payload.offset;
      state = state.setFileReadOffset(offset);
      break;
    }
  }
  return state;
}

export const uploadProgressReducer: ActionReducer<UploadProgress> = _uploadProgressReducer;
