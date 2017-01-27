import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from 'filebounce/webui/app.component';
import { StatusFooterComponent } from 'filebounce/webui/status-footer';
import { UploadComponent } from 'filebounce/webui/upload';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    StatusFooterComponent,
    UploadComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class WebUIModule { }
