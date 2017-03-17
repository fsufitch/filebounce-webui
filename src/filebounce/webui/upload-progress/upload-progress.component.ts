import filesize = require('file-size');
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UploadProgressService } from 'filebounce/services/upload-progress.service';
import { FileService } from 'filebounce/services/file.service';

@Component({
  selector: 'upload-progress',
  template: require('./upload-progress.component.html'),
})
export class UploadProgressComponent {
  file$ = this._fileService.getSelectedFile();
  filename$ = this.file$.map(file => file.name);
  mimetype$ = this.file$.map(file => file.type);
  filesize$ = this.file$.map(file => file.size);
  filesizeHuman$ = this.filesize$
    .map(bytes => filesize(bytes).human('si'));

  bytesUploaded$ = this._uploadProgressService.getBytesUploaded();
  bytesUploadedHuman$ = this.bytesUploaded$
    .map(bytes => filesize(bytes).human('si'));
  percentProgressRounded$ = Observable.combineLatest(this.bytesUploaded$, this.filesize$)
    .map(([bytes, total]) => Math.round(bytes / total * 100));
  percentProgressString$ = this.percentProgressRounded$.map(num => `${num}%`);

  constructor(
    private _fileService: FileService,
    private _uploadProgressService: UploadProgressService
  ) {}
}
