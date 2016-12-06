import { Injectable } from '@angular/core';
import { RxWebSocket } from 'rxsocket';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class TransferNodeConnectionService {
  private socket: RxWebSocket<ArrayBuffer>;
  private _incoming_clean: Observable<Uint8Array>;

  constructor() {
    this.socket = new RxWebSocket<ArrayBuffer>(this.getTransferNodeUrl());
    this._incoming_clean = this.socket.incoming
      .catch(err => {
        console.error('Error from inbound websocket', err);
        return Observable.empty<ArrayBuffer>();
      })
      .map(buf => new Uint8Array(buf));
  }

  get open() {
    return this.socket.open.share();
  }

  get incoming() {
    return this._incoming_clean.share();
  }

  get outgoing() {
    return this.socket.outgoing;
  }

  private getTransferNodeUrl() {
    if (!!process.env.TRANSFER_NODE_URL) {
      return process.env.TRANSFER_NODE_URL;
    }
    return 'ws://localhost:8888/client_ws';
  }
}
