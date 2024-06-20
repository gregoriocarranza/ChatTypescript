import { Socket } from "socket.io";

class WebsocketServices {
  public static _socketMap: Map<String, any> = new Map();

  public async sendMessage(message: any, room: string | null) {
    try {
      const instance: Socket = WebsocketServices._socketMap.get("io");
      if (room != "general" && room != null) {
        instance.to(room).emit("NEW_MESSAGE", message);
      } else {
        instance.emit("NEW_MESSAGE", message);
      }
      return true;
    } catch (error) {
      throw new Error("An error has ocurre");
    }
  }
}

export default WebsocketServices;
