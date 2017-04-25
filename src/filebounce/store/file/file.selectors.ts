import { Observable } from 'rxjs/Observable';

import { FileSelectionState } from 'filebounce/models/file.state';

export function getSelectedFile() {
  return (state$: Observable<FileSelectionState>) => state$.map(s => s.file);
}

export function getFileConfirmed() {
  return (state$: Observable<FileSelectionState>) => state$.map(s => s.confirmed);
}
