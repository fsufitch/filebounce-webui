import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { StatusFooterComponent } from './status-footer';
import { FileSelectComponent } from './file-select';
import { FileInputComponent } from './file-input';
import { UploadOptionsComponent } from './upload-options';
import { RecipientListComponent } from './recipient-list';

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
  ],
  bootstrap: [ AppComponent ]
})
export class WebUIModule { }
