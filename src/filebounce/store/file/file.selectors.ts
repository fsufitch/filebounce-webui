import { Observable } from 'rxjs/Observable';

import { FileState } from 'filebounce/models/file.state';

export function getSelectedFile() {
  return (state$: Observable<FileState>) => state$.map(s => s.file);
}

export function getFileConfirmed() {
  return (state$: Observable<FileState>) => state$.map(s => s.confirmed);
}
