import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MessageMuxService, MessageEmitService } from 'filebounce/net';

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

  constructor(
    private _messageEmitService: MessageEmitService,
    private _messageMuxService: MessageMuxService
  ) {}

  ngOnInit() {
    this._messageMuxService.getOpened()
      .filter(open => open)
      .subscribe(() => this._messageEmitService.sendAuthenticateMessage('xxx'));
  }
}
