/// <reference types="file-size" />
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WurflService } from 'custom_vendor/wurfl';
import filesize = require('file-size');

@Component({
  selector: 'upload',
  template: require('./upload.component.html'),
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef: ElementRef;

  isMobile$ = this._wurflService.getWurfl().map(wurfl => wurfl.is_mobile);

  selectedFile$ = new BehaviorSubject<File>(null);
  selectedSizeHuman$ = this.selectedFile$
    .filter(f => !!f)
    .map(f => filesize(f.size).human('si'));
  selectedMimeType$ = this.selectedFile$
    .filter(f => !!f)
    .map(f => f.type || 'application/octet-stream');

  constructor(private _wurflService: WurflService) {}

  get fileInput() {
    return <HTMLInputElement>this.fileInputRef.nativeElement;
  }

  ngOnInit() {
    this.fileInput.addEventListener('change', () => this.fileSelected());
  }

  fileSelected() {
    this.selectedFile$.next(this.fileInput.files[0]);
  }

  humanFileSize(bytes: number) {
    return filesize(bytes).human('si');
  }
}
