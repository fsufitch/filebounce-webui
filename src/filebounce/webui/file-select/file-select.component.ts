import {
  Component, ViewChild, Output, EventEmitter, ElementRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WurflService } from 'custom_vendor/wurfl';
import { FileService } from 'filebounce/services/file.service';

import filesize = require('file-size');

@Component({
  selector: 'file-select',
  template: require('./file-select.component.html'),
})
export class FileSelectComponent {
  @ViewChild('fileInput') fileInputRef: ElementRef;
  @Output() fileConfirmed = new EventEmitter<File>();

  isMobile$ = this._wurflService.getWurfl().map(wurfl => wurfl.is_mobile);

  selectedFile$ = this._fileService.getSelectedFile();
  confirmedFile$ = this._fileService.getFileConfirmed();

  constructor(
    private _wurflService: WurflService,
    private _fileService: FileService,
  ) {}

  fileSelected(file: File) {
    this._fileService.setFile(file);
  }

  confirmFile() {
    this._fileService.confirmFile();
  }

}
