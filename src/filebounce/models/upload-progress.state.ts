import { Record, List } from 'immutable';

import { Recipient } from './recipient.model';

interface UploadProgressData {
  uploadId: string;
  recipients: List<Recipient>;
  bytesUploaded: number;

  requestedChunks: number;
  requestedChunkSize: number;
  fileReadOffset: number;
}

export const DEFAULT_UPLOAD_PROGRESS_STATE: UploadProgressData = {
  uploadId: null,
  recipients: List.of<Recipient>(),
  bytesUploaded: 0,
  requestedChunks: 0,
  requestedChunkSize: 0,
  fileReadOffset: 0,
};

export class UploadProgress extends Record(DEFAULT_UPLOAD_PROGRESS_STATE) implements UploadProgressData {
  uploadId: string;
  recipients: List<Recipient>;
  bytesUploaded: number;

  requestedChunks: number;
  requestedChunkSize: number;
  fileReadOffset: number;

  clear(): this {
    return <this>this.merge(DEFAULT_UPLOAD_PROGRESS_STATE);
  }

  setUploadId(id: string) {
    return <this>this.set('uploadId', id);
  }

  setRecipients(recipients: Recipient[]) {
    return <this>this.set('recipients', List.of(...recipients));
  }

  setBytesUploaded(bytes: number) {
    return <this>this.set('bytesUploaded', bytes);
  }

  setMoreDataRequest(chunks: number, chunkSize: number) {
    return <this>this.set('requestedChunks', chunks).set('requestedChunkSize', chunkSize);
  }

  setFileReadOffset(offset: number) {
    return <this>this.set('fileReadOffset', offset);
  }
}
