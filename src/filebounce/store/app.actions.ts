import { Action } from '@ngrx/store';
import { SimpleUIStage, Authentication } from 'filebounce/models/app.state';

export class SetSimpleUIStageAction implements Action {
  static type = 'filebounce/app/setSimpleUIStage';
  type = SetSimpleUIStageAction.type;
  constructor(public payload: {stage: SimpleUIStage}) {}
}

export class SendAuthenticationAction implements Action {
  static type = 'filebounce/app/sendAuthentication';
  type = SendAuthenticationAction.type;
  constructor(public payload: {authKey: string}) {}
}

export class SetAuthenticationAction implements Action {
  static type = 'filebounce/app/setAuthentication';
  type = SetAuthenticationAction.type;
  constructor(public payload: {authentication: Authentication}) {}
}

export class ResetAppAction implements Action {
  static type = 'filebounce/app/reset';
  type = ResetAppAction.type;
}
