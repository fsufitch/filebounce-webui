import { Action } from '@ngrx/store';
import { SimpleUIStage } from 'filebounce/models/app.state';

export class SetSimpleUIStageAction implements Action {
  static type = 'filebounce/app/setSimpleUIStage';
  type = SetSimpleUIStageAction.type;
  constructor(public payload: {stage: SimpleUIStage}) {}
}

export class ResetAppAction implements Action {
  static type = 'filebounce/app/reset';
  type = ResetAppAction.type;
}
