import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FileDropModule } from 'angular2-file-drop';

import { FileSelectService } from './file-select';

@Component({
  selector: 'ng2app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.scss'),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private fileSelectService: FileSelectService) {}

  onFileDrop(f: File) {
    this.fileSelectService.selectFile(f);
  }
}
