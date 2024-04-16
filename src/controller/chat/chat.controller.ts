import { NextFunction, Response } from "express";
import WebsocketServices from "../../websocket.service";
// import { v4 as uuidv4 } from "uuid";

export class ChatController {
  private _websocketServices: WebsocketServices = new WebsocketServices();
  constructor() {}

  public async sendMessage(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void | any> {
    const { user, room, message } = req.body;
    console.log(user);
    this._websocketServices.sendMessage(message, room);
    res.status(200).json({ status: 200, message: "Completed" });
  }
}
