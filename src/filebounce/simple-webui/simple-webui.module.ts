import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropModule } from 'angular2-file-drop';

import { AppComponent } from './app.component';
import { FileSelectComponent, FileSelectService } from './file-select';
import { StatusFooterComponent } from './status-footer';
import { UploadReadyComponent } from './upload-ready';
import { SimpleWebUIService } from './simple-webui.service';


@NgModule({
  imports: [
    BrowserModule,
    FileDropModule,
  ],
  declarations: [
    AppComponent,
    FileSelectComponent,
    StatusFooterComponent,
    UploadReadyComponent,
  ],
  providers: [
    FileSelectService,
    SimpleWebUIService,
  ],
  bootstrap: [ AppComponent ],
})
export class SimpleWebUIModule { }
