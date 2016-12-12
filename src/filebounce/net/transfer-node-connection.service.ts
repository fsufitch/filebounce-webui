import { Injectable } from '@angular/core';
import { RxWebSocket } from 'rxsocket';
import { Observable, Observer, BehaviorSubject } from 'rxjs/Rx';

export enum ConnectionStatus {
  CONNECTING = 0, CONNECTED, ERROR, CLOSED,
}

@Injectable()
export class TransferNodeConnectionService {
  private socket: RxWebSocket<ArrayBuffer>;
  private _incoming_clean: Observable<Uint8Array>;
  private _status$ = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.CONNECTING);

  constructor() {
    this.socket = new RxWebSocket<ArrayBuffer>(this.getTransferNodeUrl());
    this._incoming_clean = this.socket.incoming
      .catch(err => {
        console.error('Error from inbound websocket', err);
        return Observable.empty<ArrayBuffer>();
      })
      .map(buf => new Uint8Array(buf));
    this.socket.open.subscribe(() => this._status$.next(ConnectionStatus.CONNECTED));
    this.socket.incoming.subscribe({
      next: () => {},
      error: () => this._status$.next(ConnectionStatus.ERROR),
      complete: () => this._status$.next(ConnectionStatus.CLOSED),
    });
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

  get status() {
    return this._status$.asObservable();
  }

  getTransferNodeUrl() {
    if (!!process.env.TRANSFER_NODE_URL) {
      return process.env.TRANSFER_NODE_URL;
    }
    return 'ws://localhost:8888/client_ws';
  }


}
