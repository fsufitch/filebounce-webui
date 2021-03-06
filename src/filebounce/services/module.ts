import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FileService } from './file.service';
import { UploadEffects } from './upload.effects';
import { UploadOptionsEffects } from './upload-options.effects';
import { UploadOptionsService } from './upload-options.service';
import { UploadProgressService } from './upload-progress.service';
import { ConnectionEffects } from './connection.effects';

@NgModule({
  imports: [
    EffectsModule.run(ConnectionEffects),
    EffectsModule.run(UploadOptionsEffects),
    EffectsModule.run(UploadEffects),
  ],
  providers: [
    FileService,
    UploadOptionsService,
    UploadProgressService,
  ],
})
export class ServicesModule { }
