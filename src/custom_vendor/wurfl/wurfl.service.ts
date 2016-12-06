/// <reference path="./wurfl.d.ts" />

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const UNKNOWN: Wurfl = {
  complete_device_name: 'Unknown device',
  form_factor: 'Other non-Mobile',
  is_mobile: false,
};

@Injectable()
export class WurflService {
  private _wurfl$ = new BehaviorSubject<Wurfl>(UNKNOWN);
  private _scriptInitialized = false;


  private _initScript() {
    if (this._scriptInitialized) return;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      script.onload = undefined;
      this._wurfl$.next(WURFL || UNKNOWN);
    };
    document.getElementsByTagName('head')[0].appendChild(script);
    script.src = '//wurfl.io/wurfl.js';
  }

  getWurfl() {
    this._initScript();
    return this._wurfl$.distinctUntilChanged().share();
  }
}
