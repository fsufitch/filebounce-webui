import { Observable } from 'rxjs/Observable';

import { UploadStep } from 'filebounce/models/upload.state';

export function getUploadId() {
  return (state$: Observable<UploadStep>) => state$.map(s => s.uploadId);
}

export function getTrigger() {
  return (state$: Observable<UploadStep>) => state$.map(s => s.trigger);
}

export function getRecipients() {
  return (state$: Observable<UploadStep>) => state$.map(s => s.recipients);
}

export function getBytesUploaded() {
  return (state$: Observable<UploadStep>) => state$.map(s => s.bytesUploaded);
}
