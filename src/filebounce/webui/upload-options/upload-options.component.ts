import { Component } from '@angular/core';
import * as clipboard from 'clipboard-js';

import { UploadTrigger } from 'filebounce/models/upload-options.state';
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

  triggerManual() {
    this.recipientsCount$.take(1).subscribe(count => {
      if (count < 1) {
        alert('Must have at least one person downloading to start manual upload');
        return;
      }
      this._uploadOptionsService.setUploadTrigger(UploadTrigger.Manual);
      this._uploadOptionsService.uploadOptionsSubmitted();
    });
  }

  triggerMinRecipients(minRecipients: number) {
    minRecipients = Math.floor(+minRecipients);
    if (minRecipients < 1) {
      alert(`"${minRecipients}" recipients makes no sense. Try again.`);
      return;
    }
    this._uploadOptionsService.setUploadTrigger(UploadTrigger.WaitForRecipients);
    this._uploadOptionsService.setMinRecipients(minRecipients);
    this._uploadOptionsService.uploadOptionsSubmitted();
}

  triggerWaitSeconds(waitSeconds: number) {
    waitSeconds = Math.floor(+waitSeconds);
    if (waitSeconds < 1) {
      alert(`"${waitSeconds}" seconds makes no sense. Try again.`);
      return;
    }
    this._uploadOptionsService.setUploadTrigger(UploadTrigger.Timer);
    this._uploadOptionsService.setWaitSeconds(waitSeconds);
    this._uploadOptionsService.uploadOptionsSubmitted();
  }
}
