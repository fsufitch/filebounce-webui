import { Action } from '@ngrx/store';

import { Recipient } from 'filebounce/models/recipient.model';

export class SetUploadIdAction implements Action {
  static type = 'filebounce/uploadProgress/setUploadId';
  type = SetUploadIdAction.type;
  constructor(public payload: {uploadId: string}) {}
}

export class SetRecipientsAction implements Action {
  static type = 'filebounce/uploadProgress/setRecipients';
  type = SetRecipientsAction.type;
  constructor(public payload: {recipients: Recipient[]}) {}
}

export class SetBytesUploadedAction implements Action {
  static type = 'filebounce/uploadProgress/setBytesUploaded';
  type = SetBytesUploadedAction.type;
  constructor(public payload: {bytes: number}) {}
}
