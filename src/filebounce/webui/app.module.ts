import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }   from '@angular/http';

import { WurflModule } from 'custom_vendor/wurfl';
import { NetworkModule } from 'filebounce/net';
import { AppComponent }  from 'filebounce/webui/app.component';
import { StatusFooterComponent } from 'filebounce/webui/status-footer';
import { UploadComponent } from 'filebounce/webui/upload';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    WurflModule,
    NetworkModule,
  ],
  declarations: [
    AppComponent,
    StatusFooterComponent,
    UploadComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
