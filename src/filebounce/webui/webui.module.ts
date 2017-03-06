import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from 'filebounce/webui/app.component';
import { StatusFooterComponent } from 'filebounce/webui/status-footer';
import { FileSelectComponent } from 'filebounce/webui/file-select';
import { FileInputComponent } from 'filebounce/webui/file-input';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    StatusFooterComponent,
    FileSelectComponent,
    FileInputComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class WebUIModule { }
