import { Record } from 'immutable';
import { FileSelectionState } from './file.state';
import { UploadOptions } from './upload-options.state';
import { UploadProgress } from './upload-progress.state';

export enum UIStep {
  SelectFile = 0, SelectOptions, Uploading, UploadComplete,
}

interface AppStateData {
  currentStep: UIStep;
  file: FileSelectionState;
  uploadOptions: UploadOptions;
  uploadProgress: UploadProgress;
}

export const DEFAULT_APP_STATE: AppStateData = {
  currentStep: UIStep.SelectFile,
  file: undefined,
  uploadOptions: undefined,
  uploadProgress: undefined,
};

export class AppState extends Record(DEFAULT_APP_STATE) implements AppStateData {
  currentStep: UIStep;
  file: FileSelectionState;
  uploadOptions: UploadOptions;
  uploadProgress: UploadProgress;

  setStep(step: UIStep) {
    return <this>this.set('currentStep', step);
  }
}
