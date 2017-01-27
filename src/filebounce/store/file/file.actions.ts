import { Action } from '@ngrx/store';

export class ClearSelectedFileAction implements Action {
  static type = 'filebounce/file/clear';
  type = ClearSelectedFileAction.type;
}

export class SetSelectedFileAction implements Action {
  static type = 'filebounce/file/set';
  type = SetSelectedFileAction.type;
  constructor(public payload: {file: File}) {}
}

export class ConfirmSelectedFileAction implements Action {
  static type = 'filebounce/file/confirm';
  type = ConfirmSelectedFileAction.type;
}
