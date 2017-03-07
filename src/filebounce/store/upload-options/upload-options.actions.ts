import { Action } from '@ngrx/store';

import { UploadTrigger } from 'filebounce/models/upload-options.state';

export class SetTriggerAction implements Action {
  static type = 'filebounce/uploadOptions/setTrigger';
  type = SetTriggerAction.type;
  constructor(public payload: {trigger: UploadTrigger}) {}
}

export class SetWaitSecondsAction implements Action {
  static type = 'filebounce/uploadOptions/setWaitSeconds';
  type = SetWaitSecondsAction.type;
  constructor(public payload: {waitSeconds: number}) {}
}

export class SetMinRecipientsAction implements Action {
  static type = 'filebounce/uploadOptions/setMinRecipients';
  type = SetMinRecipientsAction.type;
  constructor(public payload: {minRecipients: number}) {}
}

export class UploadOptionsSubmittedAction implements Action {
  static type = 'filebounce/uploadOptions/optionsSubmitted';
  type = UploadOptionsSubmittedAction.type;
}
