import { Schema, model } from "mongoose";
import { IMessage } from "../interfaces/IMessage";

const MessageSchema = new Schema<IMessage>({
  messageUuid: { type: String, required: true },
  serviceUuid: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  fromMe: { type: Boolean, required: true },
  body: { type: String, require: true, default: "" },
  timestamp: { type: Number, default: () => Math.ceil(Date.now() / 1000) },
});

export default model<IMessage>("Message", MessageSchema);

