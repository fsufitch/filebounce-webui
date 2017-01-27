import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { WurflModule } from 'custom_vendor/wurfl';
import { NetworkModule } from 'filebounce/net';
import { ServicesModule } from 'filebounce/services/module';
import { AppComponent } from 'filebounce/webui/app.component';
import { WebUIModule } from 'filebounce/webui/webui.module';

import { appStateReducer } from 'filebounce/store/app.reducer';

@NgModule({
  imports: [
    BrowserModule,
    WurflModule,
    NetworkModule,
    StoreModule.provideStore(appStateReducer),
    ServicesModule,
    WebUIModule,
  ],
  declarations: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
