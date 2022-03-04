import "express-async-errors";
import { AuthRouter } from "./auth/AuthRouter";
import express from "express";
import cors from "cors";
import globalErrorMiddleware from "./middleware/GlobalErrorMiddleware";
import { GamesRouter } from "./games/GamesRouter";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketGame } from "./types/SocketGame";

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

const games: SocketGame = {};

namespace.on("connection", (socket) => {
  const workspace = socket.nsp;
  const name = workspace.name.match(regex)[1];

  console.log("[Connected] ", socket.id);
  games[name] = [...(games[name] ?? []), socket];

  socket.on("disconnect", () => {
    // Remove the client from the list.
    games[name] = games[name].filter((game) => game.id !== socket.id);
    console.log("[Disconnected] ", socket.id);
    console.log(games);
  });

  console.log(games);
});

export default httpServer;
