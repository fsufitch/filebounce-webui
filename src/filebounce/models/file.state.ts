import { Record } from 'immutable';

interface FileStateData {
  file: File;
  confirmed: boolean;
}

export const DEFAULT_FILE_STATE: FileStateData = {
  file: null,
  confirmed: false,
};

export class FileState extends Record(DEFAULT_FILE_STATE) implements FileStateData {
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
