import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FileDropModule } from 'angular2-file-drop';

import { SimpleUIStage } from 'filebounce/models/app.state';
import { FileSelectService } from './file-select';
import { SimpleWebUIService } from './simple-webui.service';

@Component({
  selector: 'ng2app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.scss'),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  simpleUIStage$ = this._simpleWebUIService.getSimpleUIStage();

  uploadReady$ = this.simpleUIStage$
    .map(stage => stage === SimpleUIStage.UploadReady);
  uploadInProgress$ = this.simpleUIStage$
    .map(stage => stage === SimpleUIStage.UploadInProgress);
  uploadComplete$ = this.simpleUIStage$
    .map(stage => stage === SimpleUIStage.UploadComplete);

  allowFileSelect$ = this.uploadInProgress$.combineLatest(this.uploadComplete$)
    .map(conditions => conditions.some(c => c));

  constructor(
    private _fileSelectService: FileSelectService,
    private _simpleWebUIService: SimpleWebUIService,
  ) {}

  onFileDrop(f: File) {
    this._fileSelectService.selectFile(f);
  }
}
