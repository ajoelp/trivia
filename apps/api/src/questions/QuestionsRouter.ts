import { Router } from "express";
import { list, create, fetch, update, destroy } from "./QuestionsController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import UserHasAccessToGame from "../middleware/UserHasAccessToGame";
import { body, validationResponseMiddleware } from "@ajoelp/express-validator";

export const QuestionsRouter = Router();

QuestionsRouter.get("/games/:gameId/questions", [AuthMiddleware, UserHasAccessToGame("gameId"), list]);
QuestionsRouter.post("/games/:gameId/questions", [
  body({
    value: ["required", "string"],
    answer: ["required", "string"],
    difficulty: ["required", "string"], //@todo replace with in validator
  }),
  AuthMiddleware,
  UserHasAccessToGame("gameId"),
  validationResponseMiddleware,
  create,
]);

QuestionsRouter.patch("/games/:gameId/questions/:id", [
  body({
    value: ["nullable", "string"],
    answer: ["nullable", "string"],
    difficulty: ["nullable", "string"], //@todo replace with in validator
  }),
  AuthMiddleware,
  UserHasAccessToGame("gameId"),
  validationResponseMiddleware,
  update,
]);

QuestionsRouter.get("/games/:gameId/questions/:id", [fetch]);
QuestionsRouter.delete("/games/:gameId/questions/:id", [AuthMiddleware, UserHasAccessToGame("gameId"), destroy]);
