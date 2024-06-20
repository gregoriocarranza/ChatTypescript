import { v4 as uuidv4 } from "uuid";

import { IMessageDTO } from "../dto/input/message.input.dto";
import { IMessage } from "../interfaces/IMessage";

export function MessageFactory(message: IMessageDTO) {
  const messageToSend: IMessage = {
    messageUuid: uuidv4(),
    serviceUuid: message.serviceUuid,
    body: message.body,
    from: message.from,
    fromMe: message.fromMe,
    to: message.to,
    timestamp: Math.floor(Date.now() / 1000),
  };

  return messageToSend;
}
