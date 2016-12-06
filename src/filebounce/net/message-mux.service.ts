import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TransferNodeConnectionService } from './transfer-node-connection.service';
import { ClientMessaging } from 'filebounce/protobufs';

@Injectable()
export class MessageMuxService {
  messages$ = this.transferNodeConnection.incoming
    .map(data => ClientMessaging.TransferNodeToClientMessage.deserializeBinary(data));

  constructor(private transferNodeConnection: TransferNodeConnectionService) {}

  getOpened() {
    return this.transferNodeConnection.open;
  }

  getAuthSuccessMessages() {
    return this.messages$.filter(msg =>
      msg.type === ClientMessaging.TransferNodeConnectionService.MessageType.AUTH_SUCCESS
    );
  }
}
