import { Record } from 'immutable';
import { FileState } from './file.state';

interface AppStateData {
  file: FileState;
}

export const DEFAULT_APP_STATE: AppStateData = {
  file: undefined
};

export class AppState extends Record(DEFAULT_APP_STATE) implements AppStateData {
  file: FileState;
}
