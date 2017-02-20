import { Observable } from 'rxjs/Observable';

import { SelectFileStep } from 'filebounce/models/file.state';

export function getSelectedFile() {
  return (state$: Observable<SelectFileStep>) => state$.map(s => s.file);
}

export function getFileConfirmed() {
  return (state$: Observable<SelectFileStep>) => state$.map(s => s.confirmed);
}
