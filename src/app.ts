import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
// import { MongoConfiguration } from "./configs/mongo.config";
const morgan = require("morgan");
import { ChatRouter } from "./routes/chat/chat.routes";
dotenv.config();

// MongoConfiguration.connectDB();
const app: Application = express();
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/chat", new ChatRouter().router);

export default app;
