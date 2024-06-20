import app from "./app";
import { createServer, Server } from "http";
import * as SocketIO from "socket.io";
import WebsocketServices from "./websocket.service";

const server: Server = createServer(app);
const io: any = new SocketIO.Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
WebsocketServices._socketMap.set("io", io);

// @ts-ignore
const port: number = +process.env.PORT ?? 3000;
const clientesConectados: any = [];

io.on("connection", (socket: any) => {
  console.log(`Cliente conectado ${socket.id}`);

  const nuevoCliente = { key: socket.id, placeholder: socket.id };
  clientesConectados.push(nuevoCliente);

  io.emit("NEW_USER", clientesConectados);

  socket.on("disconnect", () => {
    console.log(`-------Cliente desconectado------- ${socket.id}`);
    const index = clientesConectados.findIndex(
      (cliente: any) => cliente.key === socket.id
    );

    if (index !== -1) {
      clientesConectados.splice(index, 1);
      io.emit("NEW_USER", clientesConectados);
    }
  });
});

server.listen(port, () =>
  console.info(`Server up and running on port ${port}`)
);
