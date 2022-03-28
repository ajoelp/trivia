import { Router } from "express";
import { GetGame, GetGames, CreateGame, UpdateGame } from "./GameController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { validationResponseMiddleware, body } from "@ajoelp/express-validator";
import UserHasAccessToGame from "../middleware/UserHasAccessToGame";

export const GamesRouter = Router();

GamesRouter.get("/games", [AuthMiddleware, GetGames]);
GamesRouter.get("/games/:id", [AuthMiddleware, UserHasAccessToGame(), GetGame]);

GamesRouter.post("/games", [
  body({
    name: ["required", "string"],
    active: ["nullable", "boolean"],
  }),
  AuthMiddleware,
  UserHasAccessToGame(),
  validationResponseMiddleware,
  CreateGame,
]);

GamesRouter.patch("/games/:id", [
  body({
    name: ["nullable", "string"],
    active: ["nullable", "boolean"],
  }),
  AuthMiddleware,
  UserHasAccessToGame(),
  validationResponseMiddleware,
  UpdateGame,
]);
