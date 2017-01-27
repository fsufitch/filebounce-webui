import 'lodash';

import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@ngrx/core';
import '@ngrx/store';
import '@ngrx/effects';

import 'rxjs/Rx';
import 'protobufjs';
import 'immutable';

// import 'rxsocket';

import * as $ from 'jquery';
let _window = <any>window;
_window.$ = _window.jQuery = $;

import 'bootstrap-sass';
