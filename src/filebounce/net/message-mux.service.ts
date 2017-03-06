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
      msg.type === ClientMessaging.TransferNodeToClientMessage.MessageType.AUTH_SUCCESS
    );
  }

  getTransferCreatedMessages() {
    return this.messages$.filter(msg =>
      msg.type === ClientMessaging.TransferNodeToClientMessage.MessageType.TRANSFER_CREATED
    );
  }

  getRecipientsMessages() {
    return this.messages$.filter(msg =>
      msg.type === ClientMessaging.TransferNodeToClientMessage.MessageType.RECIPIENTS
    );
  }

  getProgressMessages() {
    return this.messages$.filter(msg =>
      msg.type === ClientMessaging.TransferNodeToClientMessage.MessageType.PROGRESS
    );
  }

  getFinishedMessages() {
    return this.messages$.filter(msg =>
      msg.type === ClientMessaging.TransferNodeToClientMessage.MessageType.FINISHED
    );
  }

  getErrorMessages() {
    return this.messages$.filter(msg =>
      msg.type === ClientMessaging.TransferNodeToClientMessage.MessageType.ERROR
    );
  }
}
