import { NgModule } from '@angular/core';

import { MessageMuxService } from './message-mux.service';
import { MessageEmitService } from './message-emit.service';
import { TransferNodeConnectionService } from './transfer-node-connection.service';

@NgModule({
  providers: [ MessageMuxService, MessageEmitService, TransferNodeConnectionService ],
})
export class NetworkModule {}
