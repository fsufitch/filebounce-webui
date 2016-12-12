import { Component } from '@angular/core';

import { TransferNodeConnectionService, ConnectionStatus } from 'filebounce/net';

@Component({
  selector: 'status-footer',
  template: require('./status-footer.component.html'),
  styles: [
    require('./status-footer.component.scss'),
  ],
})
export class StatusFooterComponent {
  connecting$ = this._connectionService.status.map(
    status => status === ConnectionStatus.CONNECTING
  );

  connected$ = this._connectionService.status.map(
    status => status === ConnectionStatus.CONNECTED
  );

  error$ = this._connectionService.status.map(
    status => status === ConnectionStatus.ERROR
  );

  closed$ = this._connectionService.status.map(
    status => status === ConnectionStatus.CLOSED
  );

  transferNodeUrl = this._connectionService.getTransferNodeUrl();

  constructor(private _connectionService: TransferNodeConnectionService) {}
}
