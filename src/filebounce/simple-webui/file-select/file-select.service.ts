import { Injectable } from '@angular/core';

import { FileService } from 'filebounce/services/file.service';

@Injectable()
export class FileSelectService {
  constructor(private fileService: FileService) {}

  selectFile(f: File) {
    this.fileService.setFile(f);
    this.fileService.confirmFile();
  }
}
