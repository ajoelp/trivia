import { Router } from "express";
import { GetGame, GetGames, CreateGame, UpdateGame } from "./Game";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const GamesRouter = Router();

GamesRouter.get("/games", GetGames);
GamesRouter.get("/games/:id", GetGame);
GamesRouter.post("/games", [AuthMiddleware, CreateGame]);
GamesRouter.patch("/games/:id", [AuthMiddleware, UpdateGame]);
