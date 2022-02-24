import { Response, NextFunction } from "express";
import { userFromToken } from "../services/json-service";
import { ApiRequest } from "../types/Api";
import UnauthorizedError from "../exceptions/UnauthorizedError";

export async function AuthMiddleware(req: ApiRequest, res: Response, next: NextFunction) {
  const user = await userFromToken(req.get("Authorization") ?? "");

  if (user == null) {
    throw new UnauthorizedError("Unauthorized.");
  }

  req.user = user;
  return next();
}
