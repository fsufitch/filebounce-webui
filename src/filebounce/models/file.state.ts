import { Record } from 'immutable';

interface FileSelectionStateData {
  file: File;
  confirmed: boolean;
}

export const DEFAULT_FILE_STATE: FileSelectionStateData = {
  file: null,
  confirmed: false,
};

export class FileSelectionState extends Record(DEFAULT_FILE_STATE) implements FileSelectionStateData {
  file: File;
  confirmed: boolean;

  clear(): this {
    return <this>this.set('file', null).set('confirmed', false);
  }

  setFile(f: File): this {
    return <this>this.set('file', f);
  }

  confirm(): this {
    let hasFile = this.file !== null;
    return <this>this.set('confirmed', hasFile);
  }
}
