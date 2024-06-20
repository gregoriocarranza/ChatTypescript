export interface IMessage  {
  messageUuid: string;
  serviceUuid: string;
  from: string;
  fromMe: boolean;
  to: string;
  body: string;
  timestamp: number;
}
