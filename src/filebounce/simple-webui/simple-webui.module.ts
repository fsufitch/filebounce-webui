import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropModule } from 'angular2-file-drop';

import { AppComponent } from './app.component';
import { FileSelectComponent, FileSelectService } from './file-select';

@NgModule({
  imports: [
    BrowserModule,
    FileDropModule,
  ],
  declarations: [
    AppComponent,
    FileSelectComponent,
  ],
  providers: [
    FileSelectService,
  ],
  bootstrap: [ AppComponent ],
})
export class SimpleWebUIModule { }
