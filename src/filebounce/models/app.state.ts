import { Record } from 'immutable';
import { FileSelectionState } from './file.state';
import { UploadOptions } from './upload-options.state';
import { UploadProgress } from './upload-progress.state';

export enum SimpleUIStage {
  NoFileSelected = 0, FileSelected, UploadReady, UploadInProgress, UploadComplete,
}

interface AppStateData {
  simpleUIStage: SimpleUIStage;
  file: FileSelectionState;
  uploadOptions: UploadOptions;
  uploadProgress: UploadProgress;
}

export const DEFAULT_APP_STATE: AppStateData = {
  simpleUIStage: SimpleUIStage.NoFileSelected,
  file: undefined,
  uploadOptions: undefined,
  uploadProgress: undefined,
};

export class AppState extends Record(DEFAULT_APP_STATE) implements AppStateData {
  simpleUIStage: SimpleUIStage;
  file: FileSelectionState;
  uploadOptions: UploadOptions;
  uploadProgress: UploadProgress;
}
