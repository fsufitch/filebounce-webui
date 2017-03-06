import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from 'filebounce/webui/app.component';
import { StatusFooterComponent } from 'filebounce/webui/status-footer';
import { FileSelectComponent } from 'filebounce/webui/file-select';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    StatusFooterComponent,
    FileSelectComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class WebUIModule { }
