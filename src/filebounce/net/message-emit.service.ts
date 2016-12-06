import { Injectable } from '@angular/core';

import { TransferNodeConnectionService } from './transfer-node-connection.service';
import { ClientMessaging } from 'filebounce/protobufs';


@Injectable()
export class MessageEmitService {
  constructor(private transferNodeConnection: TransferNodeConnectionService) {}

  sendAuthenticateMessage(key: string) {
    let msg = new ClientMessaging.ClientToTransferNodeMessage({key});
    let bytes: Uint8Array = msg.serializeBinary();
    this.transferNodeConnection.outgoing.next(bytes.buffer);
  }
}
