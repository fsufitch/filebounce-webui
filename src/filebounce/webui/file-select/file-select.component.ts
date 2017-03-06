import {
  Component, ViewChild, OnInit, Output, EventEmitter, ElementRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WurflService } from 'custom_vendor/wurfl';
import { FileService } from 'filebounce/services/file.service';

import filesize = require('file-size');

@Component({
  selector: 'file-select',
  template: require('./file-select.component.html'),
})
export class FileSelectComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef: ElementRef;
  @Output() fileConfirmed = new EventEmitter<File>();

  isMobile$ = this._wurflService.getWurfl().map(wurfl => wurfl.is_mobile);

  selectedFile$ = this._fileService.getSelectedFile();

  selectedSize$ = this.selectedFile$
    .filter(f => !!f)
    .map(f => f.size);
  selectedSizeHuman$ = this.selectedSize$
    .map(size => filesize(size).human('si'));
  selectedMimeType$ = this.selectedFile$
    .filter(f => !!f)
    .map(f => f.type || 'application/octet-stream');

  confirmedFile$ = this._fileService.getFileConfirmed();
  showConfirm$ = this.selectedFile$.combineLatest(this.confirmedFile$)
    .map(([file, confirmed]) => !!file && !confirmed);

  constructor(
    private _wurflService: WurflService,
    private _fileService: FileService,
  ) {}

  get fileInput() {
    return <HTMLInputElement>this.fileInputRef.nativeElement;
  }

  ngOnInit() {
    this.fileInput.addEventListener('change', () => this.fileSelected());
  }

  fileSelected() {
    this._fileService.setFile(this.fileInput.files[0]);
  }

  humanFileSize(bytes: number) {
    return filesize(bytes).human('si');
  }

  confirmFile() {
    this._fileService.confirmFile();
  }

}
