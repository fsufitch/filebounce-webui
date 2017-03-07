import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FileService } from './file.service';
import { UploadEffects } from './upload.effects';
import { UploadOptionsService } from './upload-options.service';

@NgModule({
  imports: [
    EffectsModule.run(UploadEffects),
  ],
  providers: [
    FileService,
    UploadOptionsService,
  ],
})
export class ServicesModule { }
