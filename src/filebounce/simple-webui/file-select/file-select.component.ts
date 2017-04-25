import * as _ from 'lodash';
import filesize = require('file-size');
import { Component, Output, EventEmitter } from '@angular/core';

import { FileSelectService } from './file-select.service';
import { FileService } from 'filebounce/services/file.service';

@Component({
  selector: 'file-select',
  template: require('./file-select.component.html'),
  styles: [require('./file-select.component.scss')],
})
export class FileSelectComponent {
  constructor(
    private fileSelectService: FileSelectService,
    private fileService: FileService,
  ) {}

  file$ = this.fileService.getSelectedFile();
  haveFile$ = this.file$.map(f => !_.isNil(f));
  fileName$ = this.file$.map(f => f.name);
  fileType$ = this.file$.map(f => f.type);
  fileSize$ = this.file$.map(f => filesize(f.size).human('si'));

  fileChangeEvent(event: Event) {
    let file = <File>_.get(event, 'target.files[0]');
    if (!_.isNil(file)) {
      this.fileSelectService.selectFile(file);
    }
  }
}
