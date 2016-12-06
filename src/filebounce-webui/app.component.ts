import { Component } from '@angular/core';

import { WurflService } from 'custom_vendor/wurfl';

@Component({
  selector: 'ng2app',
  template: require('./app.component.html'),
})
export class AppComponent {
  wurfl$ = this._wurflService.getWurfl();

  constructor(private _wurflService: WurflService) {}
}
