import { Injectable } from '@angular/core';

import { TransferNodeConnectionService } from './transfer-node-connection.service';
import { protobufs } from 'filebounce/protobufs';

@Injectable()
export class MessageEmitService {
  constructor(private transferNodeConnection: TransferNodeConnectionService) {}

  sendAuthenticateMessage(key: string) {
    let msg = new protobufs.ClientToTransferNodeMessage();
    msg.type = protobufs.ClientToTransferNodeMessage.MessageType.AUTHENTICATE;
    msg.authData = protobufs.AuthenticateData.from({key});
    msg.timestamp = new Date().getTime();
    this._send(msg);
  }

  sendFileMetadata(filename: string, mimetype: string, size: number) {
    let msg = new protobufs.ClientToTransferNodeMessage();
    msg.type = protobufs.ClientToTransferNodeMessage.MessageType.START_UPLOAD;
    msg.startData = protobufs.StartUploadData.from({filename, mimetype, size});
    msg.timestamp = new Date().getTime();
    this._send(msg);
  }

  sendFileData(data: Blob, order: number) {
    TransferNodeConnectionService.blobToByteArray(data).take(1).subscribe(bytes => {
      let msg = new protobufs.ClientToTransferNodeMessage();
      msg.type = protobufs.ClientToTransferNodeMessage.MessageType.UPLOAD_DATA;
      msg.uploadData = new protobufs.UploadData();
      msg.uploadData.order = order;
      msg.uploadData.size = data.size;
      msg.uploadData.data = bytes;
      msg.timestamp = new Date().getTime();
      this._send(msg);
    });
  }

  private _send(protobuf: protobufs.ClientToTransferNodeMessage) {
    console.debug('Sending data:', protobuf.toObject());
    let bytes: Uint8Array = protobufs.ClientToTransferNodeMessage.encode(protobuf).finish();
    this.transferNodeConnection.outgoing.next(bytes);
  }
}
