import { Router } from "express";
import { ChatController } from '../../controller/chat/chat.controller';

export class ChatRouter {
  public router: Router = Router();
  private _chatController: ChatController = new ChatController();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      "/",
      this._chatController.sendMessage.bind(this._chatController)
    );
  }
}
