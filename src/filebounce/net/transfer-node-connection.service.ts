import { Injectable } from '@angular/core';
// import { RxWebSocket } from 'rxsocket';  // :(
import { Observable, Observer, BehaviorSubject, Subject } from 'rxjs/Rx';

export enum ConnectionStatus {
  CONNECTING = 0, CONNECTED, ERROR, CLOSED,
}

function stringToArrayBuffer(str: string): ArrayBuffer {
  // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  if (str.length === 0) {
    return new ArrayBuffer(0);
  }
  let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  let bufView = new Uint16Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function arrayBufferToString(buf: ArrayBuffer): string {
  return String.fromCharCode(...<any>buf);
}

@Injectable()
export class TransferNodeConnectionService {
  private socket: WebSocket = null;
  private _status$ = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.CONNECTING);
  private _incoming$ = new Subject<ArrayBuffer>();
  private _incoming_clean$ = this._incoming$
    .map(buf => new Uint8Array(buf))
    .share();
  private _outgoing$ = new Subject<Uint8Array>();
  private _outgoing_serialized$ = this._outgoing$.map(arr => arr.buffer);

  constructor() {
    this.socketReset();
    this._outgoing_serialized$.subscribe(buf => this.socket.send(buf));
  }

  socketReset() {
    if (!!this.socket) {
      this.socket.close();
      this.socket.onerror = () => {};
      this.socket.onclose = () => {};
    }
    this._status$.next(ConnectionStatus.CONNECTING);
    this.socket = new WebSocket(this.getTransferNodeUrl());
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => this._status$.next(ConnectionStatus.CONNECTED);
    this.socket.onerror = (err) => {
      console.error('Websocket error', err);
      this._status$.next(ConnectionStatus.ERROR);
      this._incoming$.complete();
    };
    this.socket.onclose = () => {
      this._status$.next(ConnectionStatus.CLOSED);
      this._incoming$.complete();
    };

  }

  get open() {
    return this.status.map(s => s === ConnectionStatus.CONNECTED);
  }

  get incoming() {
    return this._incoming_clean$;
  }

  get outgoing(): Observer<Uint8Array> {
    return this._outgoing$;
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
