import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { AppState } from 'filebounce/models/app.state';

export function getFileState() {
  return (state$: Observable<AppState>) => state$.select(s => s.file);
}

export function getUIStep() {
  return (state$: Observable<AppState>) => state$.select(s => s.currentStep);
}
