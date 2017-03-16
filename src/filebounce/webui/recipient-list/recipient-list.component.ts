import { Component } from '@angular/core';

import { UploadProgressService } from 'filebounce/services/upload-progress.service';

@Component({
  selector: 'recipient-list',
  template: require('./recipient-list.component.html'),
})
export class RecipientListComponent {
  recipients$ = this._uploadProgressService.getRecipients()
    .map(list => list.toArray());

  numRecipients$ = this.recipients$.map(arr => arr.length);

  constructor(private _uploadProgressService: UploadProgressService) {}
}
