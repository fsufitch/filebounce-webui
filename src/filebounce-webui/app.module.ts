import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }   from '@angular/http';

import { WurflModule } from 'custom_vendor/wurfl';
import { AppComponent }  from 'filebounce-webui/app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    WurflModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
