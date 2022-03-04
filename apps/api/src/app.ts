import "express-async-errors";
import { AuthRouter } from "./auth/AuthRouter";
import express from "express";
import cors from "cors";
import globalErrorMiddleware from "./middleware/GlobalErrorMiddleware";
import { GamesRouter } from "./games/GamesRouter";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

app.use(AuthRouter);
app.use(GamesRouter);

app.use(globalErrorMiddleware);

// io.on("connection", (socket) => {
//   console.log("we connected boyz");
// });

const regex = /\/(.*)/;

const namespace = io.of(regex);

const games = [];

namespace.on("connection", (socket) => {
  const name = socket.nsp.name.match(regex)[1];
  games.push({ [name]: socket.client });

  console.log(games);
});

export default httpServer;
