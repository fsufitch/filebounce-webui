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

export class SetMoreDataRequestAction implements Action {
  static type = 'filebounce/uploadProgress/setMoreDataRequest';
  type = SetMoreDataRequestAction.type;
  constructor(public payload: {chunks: number, chunkSize: number}) {}
}

export class ProcessMoreDataRequestAction implements Action {
  static type = 'filebounce/uploadProgress/processMoreDataRequest';
  type = ProcessMoreDataRequestAction.type;
}

export class StartUploadAction implements Action {
  static type = 'filebounce/uploadProgress/startUpload';
  type = StartUploadAction.type;
}

export class UploadChunkAction implements Action {
  static type = 'filebounce/uploadProgress/uploadChunk';
  type = UploadChunkAction.type;
  constructor(public payload: {bytes: number}) {}
}

export class SetFileReadOffsetAction implements Action {
  static type = 'filebounce/uploadProgress/setFileReadOffset';
  type = SetFileReadOffsetAction.type;
  constructor(public payload: {offset: number}) {}
}
