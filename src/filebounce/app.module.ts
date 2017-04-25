import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { WurflModule } from 'custom_vendor/wurfl';
import { NetworkModule } from 'filebounce/net';
import { ServicesModule } from 'filebounce/services/module';
import { AppComponent } from 'filebounce/simple-webui/app.component';
import { SimpleWebUIModule } from 'filebounce/simple-webui/simple-webui.module';

import { appStateReducer } from 'filebounce/store/app.reducer';

@NgModule({
  imports: [
    BrowserModule,
    WurflModule,
    NetworkModule,
    StoreModule.provideStore(appStateReducer),
    ServicesModule,
    SimpleWebUIModule,
  ],
  declarations: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
