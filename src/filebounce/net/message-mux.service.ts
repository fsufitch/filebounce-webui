import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TransferNodeConnectionService } from './transfer-node-connection.service';
import { protobufs } from 'filebounce/protobufs';

@Injectable()
export class MessageMuxService {
  messages$ = this.transferNodeConnection.incoming
    .map(data => protobufs.TransferNodeToClientMessage.decode(data));

  constructor(private transferNodeConnection: TransferNodeConnectionService) {
    this.messages$.subscribe(data => console.debug('Receiving data:', data));
  }

  getOpened() {
    return this.transferNodeConnection.open;
  }

  getAuthSuccessMessages() {
    return this.messages$.filter(msg =>
      msg.type === protobufs.TransferNodeToClientMessage.MessageType.AUTH_SUCCESS
    );
  }

  getTransferCreatedMessages() {
    return this.messages$.filter(msg =>
      msg.type === protobufs.TransferNodeToClientMessage.MessageType.TRANSFER_CREATED
    );
  }

  getRecipientsMessages() {
    return this.messages$.filter(msg =>
      msg.type === protobufs.TransferNodeToClientMessage.MessageType.RECIPIENTS
    );
  }

  getProgressMessages() {
    return this.messages$.filter(msg =>
      msg.type === protobufs.TransferNodeToClientMessage.MessageType.PROGRESS
    );
  }

  getFinishedMessages() {
    return this.messages$.filter(msg =>
      msg.type === protobufs.TransferNodeToClientMessage.MessageType.FINISHED
    );
  }

  getErrorMessages() {
    return this.messages$.filter(msg =>
      msg.type === protobufs.TransferNodeToClientMessage.MessageType.ERROR
    );
  }
}
