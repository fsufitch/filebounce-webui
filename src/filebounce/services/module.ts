import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FileService } from './file.service';
import { UploadEffects } from './upload.effects';

@NgModule({
  imports: [
    EffectsModule.run(UploadEffects),
  ],
  providers: [
    FileService,
  ],
})
export class ServicesModule { }
