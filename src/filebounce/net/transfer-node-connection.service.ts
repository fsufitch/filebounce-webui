import { Injectable } from '@angular/core';
// import { RxWebSocket } from 'rxsocket';  // :(
import { Observable, Observer, BehaviorSubject, Subject } from 'rxjs/Rx';

export enum ConnectionStatus {
  CONNECTING = 0, CONNECTED, ERROR, CLOSED,
}

function blobToByteArray(blob: Blob): Observable<Uint8Array> {
  let output$ = new Subject<Uint8Array>();
  let reader = new FileReader();
  reader.onload = () => {
    let buf: ArrayBuffer = reader.result;
    output$.next(new Uint8Array(buf));
    output$.complete();
  };
  reader.onerror = (err) => output$.error(err);
  reader.readAsArrayBuffer(blob);
  return output$.asObservable();
}

@Injectable()
export class TransferNodeConnectionService {
  private socket: WebSocket = null;
  private _status$ = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.CONNECTING);
  private _incoming$ = new Subject<Blob>();
  private _incoming_bytearray$ = this._incoming$
    .flatMap(blob => blobToByteArray(blob))
    .share();
  private _outgoing$ = new Subject<Uint8Array>();
  private _outgoing_blob$ = this._outgoing$.map(arr => new Blob([arr]));

  constructor() {
    this.socketReset();
    this._outgoing_blob$.subscribe(buf => this.socket.send(<Blob>buf));
  }

  socketReset() {
    if (!!this.socket) {
      this.socket.close();
      this.socket.onerror = () => {};
      this.socket.onclose = () => {};
    }
    this._status$.next(ConnectionStatus.CONNECTING);
    this.socket = new WebSocket(this.getTransferNodeUrl());
    this.socket.binaryType = 'blob';

    this.socket.onopen = () => this._status$.next(ConnectionStatus.CONNECTED);
    this.socket.onmessage = (ev) => this._incoming$.next(ev.data);
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
    return this._incoming_bytearray$;
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

  getTransferNodeDownloadUrl(uploadId: string) {
    if (!!process.env.TRANSFER_NODE_DOWNLOAD_URL) {
      return `${process.env.TRANSFER_NODE_DOWNLOAD_URL}/${uploadId}`;
    }
    return `http://localhost:8888/download/${uploadId}`;
  }
}
