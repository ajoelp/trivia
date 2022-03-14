import { Router } from "express";
import { GetGame, GetGames, CreateGame, UpdateGame } from "./GameController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const GamesRouter = Router();

GamesRouter.get("/games", [AuthMiddleware, GetGames]);
GamesRouter.get("/games/:id", [AuthMiddleware, GetGame]);
GamesRouter.post("/games", [AuthMiddleware, CreateGame]);
GamesRouter.patch("/games/:id", [AuthMiddleware, UpdateGame]);
