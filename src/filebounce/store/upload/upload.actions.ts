import { Action } from '@ngrx/store';

import { UploadTrigger } from 'filebounce/models/upload.state';
import { Recipient } from 'filebounce/models/recipient.model';

export class SetUploadIdAction implements Action {
  static type = 'filebounce/upload/setId';
  type = SetUploadIdAction.type;
  constructor(public payload: {uploadId: string}) {}
}

export class SetTriggerAction implements Action {
  static type = 'filebounce/upload/setTrigger';
  type = SetTriggerAction.type;
  constructor(public payload: {trigger: UploadTrigger}) {}
}

export class SetBytesUploadedAction implements Action {
  static type = 'filebounce/upload/setBytesUploaded';
  type = SetBytesUploadedAction.type;
  constructor(public payload: {bytes: number}) {}
}

export class AddRecipientAction implements Action {
  static type = 'filebounce/upload/addRecipient';
  type = AddRecipientAction.type;
  constructor(public payload: {recipient: Recipient}) {}
}
