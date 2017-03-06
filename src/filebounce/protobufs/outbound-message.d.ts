type OutboundMessageType = 0 | 1 | 2 | 3 | 4;

interface OutboundMessageTypeMapping {
  AUTHENTICATE: 0;
  START_UPLOAD: 1;
  UPLOAD_DATA: 2;
  FINISHED: 3;
  ERROR: 4;
}

declare interface AuthenticateData {
  new(data?: [string]): this;
  key: string;
}

declare interface StartUploadData {
  new(data?: [string, string, number]): this;
  filename: string;
  mimetype: string;
  size: number;
}

declare interface UploadData {
  new(data?: [number, number, string]): this;
  order: number;
  size: number;
  data: string; // ?
}

declare interface FinishedData {
  new(data?: [string, boolean]): this;
  error: string;
  success: boolean;
}

declare interface ClientToTransferNodeMessage {
  new(): this;
  type: OutboundMessageType;
  authData: AuthenticateData;
  startData: StartUploadData;
  uploadData: UploadData;
  finishedData: FinishedData;
  timestamp: number;
}

interface ClientToTransferNodeMessageProto extends ClientToTransferNodeMessage {
  MessageType: OutboundMessageTypeMapping;
  setType(type: OutboundMessageType): void;
  setAuthdata(data: AuthenticateData): void;
  setStartdata(data: StartUploadData): void;
  setUploaddata(data: UploadData): void;
  setFinisheddata(data: FinishedData): void;
  setTimestamp(timestamp: number): void;
}

declare interface OutboundClientMessaging {
  ClientToTransferNodeMessage: ClientToTransferNodeMessageProto;
  AuthenticateData: AuthenticateData;
  StartUploadData: StartUploadData;
  UploadData: UploadData;
  FinishedData: FinishedData;
}
