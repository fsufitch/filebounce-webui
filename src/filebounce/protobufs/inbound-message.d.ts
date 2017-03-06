type InboundMessageTypeValue = 0 | 1 | 3 | 4 | 5 | 6;

interface InboundMessageTypeMapping {
  AUTH_SUCCESS: 0;
  TRANSFER_CREATED: 1;
  RECIPIENTS: 3;
  PROGRESS: 4;
  FINISHED: 5;
  ERROR: 6;
}

declare interface AuthSuccessData {}

declare interface TransferCreatedData {
  transferId: string;
  chunkSize: number;
  requestChunks: number;
}

interface Recipient {
  ipv4: string;
  ipv6: string;
  identity: string;
}

declare interface RecipientsData {
  recipients: Recipient[];
}

declare interface ProgressData {
  bytesUploaded: number;
  requestChunks: number;
  chunkSize: number;
}

declare interface ErrorData {
  title: string;
  jsonDetails: string;
  fatal: boolean;
}

declare interface FinishedData {
  error: string;
  success: boolean;
}

declare interface TransferNodeToClientMessage {
  type: InboundMessageTypeValue;
  authSuccessData: AuthSuccessData;
  transferCreatedData: TransferCreatedData;
  recipientsData: RecipientsData;
  progressData: ProgressData;
  finishedData: FinishedData;
  errorData: ErrorData;
  timestamp: number;
}

declare interface TransferNodeToClientMessageProto {
  MessageType: InboundMessageTypeMapping;
  deserializeBinary: (data: Uint8Array) => TransferNodeToClientMessage;
}

declare interface InboundClientMessaging {
  TransferNodeToClientMessage: TransferNodeToClientMessageProto;
}
