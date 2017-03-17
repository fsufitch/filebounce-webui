import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { StatusFooterComponent } from './status-footer';
import { FileSelectComponent } from './file-select';
import { FileInputComponent } from './file-input';
import { UploadOptionsComponent } from './upload-options';
import { RecipientListComponent } from './recipient-list';
import { UploadProgressComponent } from './upload-progress';
import { UploadCompleteComponent } from './upload-complete';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    StatusFooterComponent,
    FileSelectComponent,
    FileInputComponent,
    UploadOptionsComponent,
    RecipientListComponent,
    UploadProgressComponent,
    UploadCompleteComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class WebUIModule { }
