import { Observable } from 'rxjs/Observable';

import { AppState } from 'filebounce/models/app.state';

export function getFileState() {
  return (state$: Observable<AppState>) => state$.map(s => s.file);
}
