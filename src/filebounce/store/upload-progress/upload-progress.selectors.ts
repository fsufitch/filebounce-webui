import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { UploadProgress } from 'filebounce/models/upload-progress.state';

export function getUploadId() {
  return (state$: Observable<UploadProgress>) => state$.select(s => s.uploadId);
}

export function getRecipients() {
  return (state$: Observable<UploadProgress>) => state$.select(s => s.recipients);
}

export function getBytesUploaded() {
  return (state$: Observable<UploadProgress>) => state$.select(s => s.bytesUploaded);
}

export function getMoreDataRequest() {
  return (state$: Observable<UploadProgress>) => state$.select(s => ({
    requestedChunks: s.requestedChunks,
    requestedChunkSize: s.requestedChunkSize,
  }));
}

export function getFileReadOffset() {
  return (state$: Observable<UploadProgress>) => state$.select(s => s.fileReadOffset);
}
