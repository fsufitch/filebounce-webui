import { Component } from '@angular/core';
import * as clipboard from 'clipboard-js';

import { UploadOptionsService } from 'filebounce/services/upload-options.service';
import { UploadProgressService } from 'filebounce/services/upload-progress.service';
import { TransferNodeConnectionService } from 'filebounce/net/transfer-node-connection.service';

@Component({
  selector: 'upload-options',
  template: require('./upload-options.component.html'),
  styles: [
    require('./upload-options.component.scss'),
  ],
})
export class UploadOptionsComponent {
  uploadId$ = this._uploadProgressService.getUploadId();
  downloadUrl$ = this.uploadId$.map(id => this._connectionService.getTransferNodeDownloadUrl(id));
  recipients$ = this._uploadProgressService.getRecipients();
  recipientsCount$ = this.recipients$.map(recipients => recipients.size);

  constructor(
    private _uploadOptionsService: UploadOptionsService,
    private _uploadProgressService: UploadProgressService,
    private _connectionService: TransferNodeConnectionService
  ) {}

  copyToClipboard() {
    this.downloadUrl$.take(1).subscribe(url => clipboard.copy(url));
  }
}
