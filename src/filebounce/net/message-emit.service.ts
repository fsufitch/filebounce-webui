import { Injectable } from '@angular/core';

import { TransferNodeConnectionService } from './transfer-node-connection.service';
import { ClientMessaging } from 'filebounce/protobufs';


@Injectable()
export class MessageEmitService {
  constructor(private transferNodeConnection: TransferNodeConnectionService) {}

  sendAuthenticateMessage(key: string) {
    let msg = new ClientMessaging.ClientToTransferNodeMessage();
    msg.setType(ClientMessaging.ClientToTransferNodeMessage.MessageType.AUTHENTICATE);
    msg.setAuthdata(new ClientMessaging.AuthenticateData([key]));
    this._send(msg);
  }

  sendFileMetadata(filename: string, mimetype: string, size: number) {
    let msg = new ClientMessaging.ClientToTransferNodeMessage();
    msg.setType(ClientMessaging.ClientToTransferNodeMessage.MessageType.START_UPLOAD);
    msg.setStartuploaddata(
      new ClientMessaging.StartUploadData([filename, mimetype, size])
    );
    this._send(msg);
  }

  private _send(protobuf: any) {
    let bytes: Uint8Array = protobuf.serializeBinary();
    this.transferNodeConnection.outgoing.next(bytes);
  }
}
