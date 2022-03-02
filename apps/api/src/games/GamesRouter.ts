import { Router } from "express";
import { GetGame, GetGames } from "./Game";

export const GamesRouter = Router();

GamesRouter.get("/games", GetGames);
GamesRouter.get("/games/:id", GetGame);
