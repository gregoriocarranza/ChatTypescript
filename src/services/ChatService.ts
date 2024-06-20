import { IMessage } from "../interfaces/IMessage";
import MessageModel from "../models/message.model";

export class ChatService {
  public async createMessage(data: IMessage): Promise<IMessage> {
    const newMessage = new MessageModel(data);
    return newMessage.save();
  }

  public async retrieveMessages(): Promise<IMessage[]> {
    return MessageModel.find();
  }

  public async deleteMessage(id: string): Promise<boolean> {
    const result = await MessageModel.findByIdAndDelete(id);
    return result != null;
  }
}
