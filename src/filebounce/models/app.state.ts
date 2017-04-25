import { Record } from 'immutable';
import { FileSelectionState } from './file.state';
import { UploadOptions } from './upload-options.state';
import { UploadProgress } from './upload-progress.state';

export enum SimpleUIStage {
  NoFileSelected = 0, FileSelected, UploadReady, UploadInProgress, UploadComplete,
}

export enum Authentication {
  Disconnected = 0, Success, Failure
}

interface AppStateData {
  simpleUIStage: SimpleUIStage;
  authentication: Authentication;
  file: FileSelectionState;
  uploadOptions: UploadOptions;
  uploadProgress: UploadProgress;
}

export const DEFAULT_APP_STATE: AppStateData = {
  simpleUIStage: SimpleUIStage.NoFileSelected,
  authentication: Authentication.Disconnected,
  file: undefined,
  uploadOptions: undefined,
  uploadProgress: undefined,
};

export class AppState extends Record(DEFAULT_APP_STATE) implements AppStateData {
  authentication: Authentication;
  simpleUIStage: SimpleUIStage;
  file: FileSelectionState;
  uploadOptions: UploadOptions;
  uploadProgress: UploadProgress;
}
