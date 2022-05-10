import "dotenv/config";
import "express-async-errors";
import { AuthRouter } from "./auth/AuthRouter";
import express from "express";
import cors from "cors";
import globalErrorMiddleware from "./middleware/GlobalErrorMiddleware";
import { GamesRouter } from "./games/GamesRouter";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameNamespace } from "./sockets/GameNamespace";
import { QuestionsRouter } from "./questions/QuestionsRouter";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

app.use(AuthRouter);
app.use(GamesRouter);
app.use(QuestionsRouter);

app.use(globalErrorMiddleware);

GameNamespace.start(io);

export default httpServer;
