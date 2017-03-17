import { Component } from '@angular/core';

import { FileService } from 'filebounce/services/file.service';
import { UploadProgressService } from 'filebounce/services/upload-progress.service';

@Component({
  selector: 'upload-complete',
  template: require('./upload-complete.component.html'),
})
export class UploadCompleteComponent {
  file$ = this._fileService.getSelectedFile();
  filename$ = this.file$.map(file => file.name);

  recipientsCount$ = this._uploadProgressService.getRecipients()
    .map(recipients => recipients.size);

  constructor(
    private _fileService: FileService,
    private _uploadProgressService: UploadProgressService
  ) {}
}
