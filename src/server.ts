import app from "./app";
import { createServer, Server } from "http";
import * as SocketIO from "socket.io";
import WebsocketServices from "./websocket.service";

const server: Server = createServer(app);
const io: any = new SocketIO.Server(server, {
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGINS || "http://localhost:5500",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
WebsocketServices._socketMap.set("io", io);

// @ts-ignore
const port: number = +process.env.PORT ?? 3000;
const clientesConectados: any = [];

// io.on("connection", (socket: any) => {
//   console.log(`Cliente conectado ${socket.id}`);
//   io.to(socket.id).emit("NEW_USER", clientesConectados);
//   clientesConectados.push({ name: socket.id, key: socket.id });

//   socket.on("chat message", (msg: any) => {
//     console.log("Mensaje: " + msg);
//   });

//   socket.on("disconnect", () => {
//     console.log(`-------Cliente desconectado------- ${socket.id}`);
//     const index = clientesConectados.findIndex(
//       (cliente: any) => cliente.key === socket.id
//     );
//     if (index !== -1) {
//       clientesConectados.splice(index, 1);
//     }

//     io.emit("NEW_USER", clientesConectados);
//   });
// });

io.on("connection", (socket: any) => {
    console.log(`Cliente conectado ${socket.id}`);
    
    if (clientesConectados.length > 0) {
      io.to(socket.id).emit("NEW_USER", clientesConectados);
    }
    
    const nuevoCliente = { name: socket.id, key: socket.id };
    clientesConectados.push(nuevoCliente);
  
    socket.broadcast.emit("NEW_USER", [nuevoCliente]);
  
    // socket.on("chat message", (msg: any) => {
    //   console.log("Mensaje: " + msg);
    //   socket.broadcast.emit("chat message", msg);
    // });
  
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
