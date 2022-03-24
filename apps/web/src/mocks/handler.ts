import { rest } from "msw";
import { respondWithData } from "./helpers";
import { GameFactory } from "../testing/factories/GameFactory";

export const handlers = [
  rest.get("/games", respondWithData([])),
  rest.post("/games", respondWithData(GameFactory.build())),
];
