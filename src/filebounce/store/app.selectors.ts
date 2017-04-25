import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { AppState } from 'filebounce/models/app.state';

export function getSimpleUIStage() {
  return (state$: Observable<AppState>) => state$.select(s => s.simpleUIStage);
}

export function getFileState() {
  return (state$: Observable<AppState>) => state$.select(s => s.file);
}

export function getUploadOptions() {
  return (state$: Observable<AppState>) => state$.select(s => s.uploadOptions);
}

export function getUploadProgress() {
  return (state$: Observable<AppState>) => state$.select(s => s.uploadProgress);
}
