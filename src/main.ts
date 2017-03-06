import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'filebounce/app.module';

declare const __PROD__: boolean;

if (!!__PROD__) {
  enableProdMode();
  console.debug = () => {};
}

platformBrowserDynamic().bootstrapModule(AppModule);
