import { Record, List } from 'immutable';

import { Recipient } from './recipient.model';

export enum UploadTrigger {
  Manual = 0, Timer, Recipients,
}

interface UploadStepData {
  uploadId: string;
  trigger: UploadTrigger;
  recipients: List<Recipient>;
  bytesUploaded: number;
}

export const DEFAULT_UPLOAD_STATE: UploadStepData = {
  uploadId: null,
  trigger: UploadTrigger.Manual,
  recipients: List.of<Recipient>(),
  bytesUploaded: 0,
};

export class UploadStep extends Record(DEFAULT_UPLOAD_STATE) implements UploadStepData {
  uploadId: string;
  trigger: UploadTrigger;
  recipients: List<Recipient>;
  bytesUploaded: number;

  clear(): this {
    return <this>this.merge(DEFAULT_UPLOAD_STATE);
  }

  setUploadId(id: string) {
    return <this>this.set('uploadId', id);
  }

  setTrigger(trigger: UploadTrigger) {
    return <this>this.set('trigger', trigger);
  }

  setBytesUploaded(bytes: number) {
    return <this>this.set('bytesUploaded', bytes);
  }

  addRecipient(recipient: Recipient) {
    return <this>this.update('recipients',
      (recipients: List<Recipient>) => recipients.push(recipient)
    );
  }
}
