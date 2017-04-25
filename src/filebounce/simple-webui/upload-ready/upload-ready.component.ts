import { Component } from '@angular/core';

import { UploadProgressService } from 'filebounce/services/upload-progress.service';
import { TransferNodeConnectionService } from 'filebounce/net';

@Component({
  selector: 'upload-ready',
  template: require('./upload-ready.component.html'),
})
export class UploadReadyComponent {
  uploadId$ = this._uploadProgressService.getUploadId();
  downloadUrl$ = this.uploadId$.map(id => this._connectionService.getTransferNodeDownloadUrl(id));

  constructor(
    private _uploadProgressService: UploadProgressService,
    private _connectionService: TransferNodeConnectionService,
  ) {}
}
