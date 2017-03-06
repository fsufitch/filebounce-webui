import { Action } from '@ngrx/store';
import { UIStep } from 'filebounce/models/app.state';

export class SetUIStepAction implements Action {
  static type = 'filebounce/app/setUIStep';
  type = SetUIStepAction.type;
  constructor(public payload: {step: UIStep}) {}
}
