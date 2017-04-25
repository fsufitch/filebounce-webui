import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropModule } from 'angular2-file-drop';

import { AppComponent } from './app.component';
import { FileSelectComponent, FileSelectService } from './file-select';
import { StatusFooterComponent } from './status-footer';

@NgModule({
  imports: [
    BrowserModule,
    FileDropModule,
  ],
  declarations: [
    AppComponent,
    FileSelectComponent,
    StatusFooterComponent,
  ],
  providers: [
    FileSelectService,
  ],
  bootstrap: [ AppComponent ],
})
export class SimpleWebUIModule { }
