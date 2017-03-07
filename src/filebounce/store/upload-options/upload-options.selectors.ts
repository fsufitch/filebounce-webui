import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { UploadOptions } from 'filebounce/models/upload-options.state';

export function getTrigger() {
  return (state$: Observable<UploadOptions>) => state$.select(s => s.trigger);
}

export function getWaitSeconds() {
  return (state$: Observable<UploadOptions>) => state$.select(s => s.waitSeconds);
}

export function getMinRecipients() {
  return (state$: Observable<UploadOptions>) => state$.select(s => s.minRecipients);
}

export function getUploadOptionsSubmitted() {
  return (state$: Observable<UploadOptions>) => state$.select(s => s.optionsSubmitted);
}
