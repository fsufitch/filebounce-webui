import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from 'filebounce/models/app.state';
// import { getUIStep } from 'filebounce/store/app.selectors';
import { MessageMuxService, MessageEmitService } from 'filebounce/net';

var getUIStep: any;

@Component({
  selector: 'ng2app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.scss')
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  authSuccess$ = Observable.of(false).concat(
    this._messageMuxService.getAuthSuccessMessages()
      .map(() => true)
      .catch(err => Observable.of(false))
  );

  // private currentStep$ = this._store$.let(getUIStep());
  // selectFileStep$ = this.currentStep$.map(step => step === UIStage.SelectFile);
  // uploadOptionsStep$ = this.currentStep$.map(step => step === UIStage.SelectOptions);
  // uploadingStep$ = this.currentStep$.map(step => step === UIStage.Uploading);
  // uploadCompleteStep$ = this.currentStep$.map(step => step === UIStage.UploadComplete);

  constructor(
    private _messageEmitService: MessageEmitService,
    private _messageMuxService: MessageMuxService,
    private _store$: Store<AppState>
  ) {}

  ngOnInit() {
    this._messageMuxService.getOpened()
      .filter(open => open)
      .subscribe(() => this._messageEmitService.sendAuthenticateMessage('xxx'));
  }
}
