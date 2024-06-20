import app from "./app";
import { createServer, Server } from "http";
import * as SocketIO from "socket.io";
import mongoose from "mongoose";
import WebsocketServices from "./websocket.service";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { DecodedToken } from "./interfaces/DecodedToken";

const server: Server = createServer(app);
const io: any = new SocketIO.Server(server, {
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGINS,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
WebsocketServices._socketMap.set("io", io);

// @ts-ignore
const port: number = +process.env.PORT ?? 3000;
const decodedSecret = Buffer.from(process.env.JWT_SECRET || "", "base64");
const clientesConectados: any = [];

io.use((socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token as string;
  jwt.verify(token, decodedSecret, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    const decodedToken = decoded as DecodedToken;
    if (decodedToken && (decodedToken.sub || decodedToken.email)) {
      console.log(decodedToken);
      socket.data.email = decodedToken.email || decodedToken.sub;
      next();
    } else {
      next(new Error("Token decoding error"));
    }
  });
});

io.on("connection", (socket: any) => {
  console.log(`Cliente conectado ${socket.data.email}`);

  const nuevoCliente = { key: socket.id, placeholder: socket.data.email };
  clientesConectados.push(nuevoCliente);

  io.emit("NEW_USER", clientesConectados);

  socket.on("disconnect", () => {
    console.log(
      `-------Cliente desconectado------- Name: ${socket.data.email} ID: ${socket.id}`
    );
    const index = clientesConectados.findIndex(
      (cliente: any) => cliente.key === socket.id
    );

    if (index !== -1) {
      clientesConectados.splice(index, 1);
      io.emit("NEW_USER", clientesConectados);
    }
  });
});

server.listen(port, () => {
  console.info(`Server up and running on port ${port}`);
});

export default mongoose;
