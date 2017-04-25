import * as _ from 'lodash';
import { Component, Output, EventEmitter } from '@angular/core';

import { FileSelectService } from './file-select.service';

@Component({
  selector: 'file-select',
  template: require('./file-select.component.html'),
  styles: [require('./file-select.component.scss')],
})
export class FileSelectComponent {
  constructor(private fileSelectService: FileSelectService) {}

  fileChangeEvent(event: Event) {
    let file = <File>_.get(event, 'target.files[0]');
    if (!_.isNil(file)) {
      this.fileSelectService.selectFile(file);
    }
  }
}
