import { Request, Response } from "express";
import { ChatService } from "../../services/ChatService";
import { IMessageDTO } from "../../dto/input/message.input.dto";
import { IMessage } from "../../interfaces/IMessage";
import { MessageFactory } from "../../utils/MessageFactory";
import WebsocketServices from "../../websocket.service";

export class ChatController {
  private _chatService: ChatService = new ChatService();
  private _websocketServices: WebsocketServices = new WebsocketServices();

  public async sendMessage(req: Request, res: Response) {
    const body: IMessageDTO = req.body;
    try {
      const message: IMessage = await this._chatService.createMessage(
        MessageFactory(body)
      );
      await this._websocketServices.sendMessage(message.body, message.to);

      res.status(201).json(message);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getMessages(req: Request, res: Response) {
    try {
      const messages = await this._chatService.retrieveMessages();
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this._chatService.deleteMessage(id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
