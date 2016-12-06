import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { WurflService } from './wurfl.service';

@NgModule({
  imports: [ HttpModule ],
  providers: [ WurflService ],
})
export class WurflModule {}
