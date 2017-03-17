import { Record, List } from 'immutable';

import { Recipient } from './recipient.model';

export enum UploadTrigger {
  Manual = 0, Timer, WaitForRecipients,
}

interface UploadOptionsData {
  trigger: UploadTrigger;
  waitSeconds: number;
  waitSecondsRemaining: number;
  minRecipients: number;
  optionsSubmitted: boolean;
}

export const DEFAULT_UPLOAD_OPTIONS_STATE: UploadOptionsData = {
  trigger: UploadTrigger.Manual,
  waitSeconds: 0,
  waitSecondsRemaining: 0,
  minRecipients: 0,
  optionsSubmitted: false,
};

export class UploadOptions extends Record(DEFAULT_UPLOAD_OPTIONS_STATE) implements UploadOptionsData {
  trigger: UploadTrigger;
  waitSeconds: number;
  waitSecondsRemaining: number;
minRecipients: number;
  optionsSubmitted: boolean;

  clear(): this {
    return <this>this.merge(DEFAULT_UPLOAD_OPTIONS_STATE);
  }

  setTrigger(trigger: UploadTrigger) {
    return <this>this.set('trigger', trigger);
  }

  setWaitSeconds(seconds: number) {
    return <this>this.set('waitSeconds', seconds);
  }

  setWaitSecondsRemaining(seconds: number) {
    return <this>this.set('waitSecondsRemaining', seconds);
  }

  setMinRecipients(minRecipients: number) {
    return <this>this.set('minRecipients', minRecipients);
  }

  setOptionsSubmitted(submitted: boolean) {
    return <this>this.set('optionsSubmitted', submitted);
  }

}
