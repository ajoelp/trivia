import { rest } from "msw";
import { respondWithData } from "./helpers";

export const handlers = [rest.get("/games", respondWithData([]))];
