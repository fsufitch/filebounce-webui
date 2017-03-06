import {
  Component, Input, ViewChild, Output, EventEmitter, ElementRef, OnInit
} from '@angular/core';
import filesize = require('file-size');

@Component({
  selector: 'file-input',
  template: require('./file-input.component.html'),
})
export class FileInputComponent implements OnInit {
  @Input() mobileMode: boolean;
  @Input() selected: File;
  @Input() confirmed: boolean;

  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileConfirmed = new EventEmitter<boolean>();

  @ViewChild('fileInput') fileInputRef: ElementRef;

  get mimetype() {
    return this.selected.type || 'application/octet-stream';
  }

  get filesize() {
    return filesize(this.selected.size).human('si');
  }

  get fileInput() {
    return <HTMLInputElement>this.fileInputRef.nativeElement;
  }

  ngOnInit() {
    this.fileInput.addEventListener('change', () => this.triggerFileSelected());
  }

  triggerFileSelected() {
    this.fileSelected.emit(this.fileInput.files[0]);
  }

  humanFileSize(bytes: number) {
    return filesize(bytes).human('si');
  }

  triggerFileConfirmed() {
    this.fileConfirmed.emit(true);
  }
}
