import { Record } from 'immutable';
import { SelectFileStep } from './file.state';
import { UploadStep } from './upload.state';

export enum UIStep {
  SelectFile = 0, SelectOptions, Uploading, UploadComplete,
}

interface AppStateData {
  currentStep: UIStep;
  file: SelectFileStep;
  upload: UploadStep;
}

export const DEFAULT_APP_STATE: AppStateData = {
  currentStep: UIStep.SelectFile,
  file: undefined,
  upload: undefined,
};

export class AppState extends Record(DEFAULT_APP_STATE) implements AppStateData {
  currentStep: UIStep;
  file: SelectFileStep;
  upload: UploadStep;

  setStep(step: UIStep) {
    return <this>this.set('currentStep', step);
  }
}
