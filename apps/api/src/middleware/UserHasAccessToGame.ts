import { ApiRequest } from "../types/Api";
import { NextFunction, Response } from "express";
import UnauthorizedError from "../exceptions/UnauthorizedError";
import { prisma } from "../../prisma";

export default function UserHasAccessToGame(key = "id") {
  return async (req: ApiRequest, _res: Response, next: NextFunction) => {
    const id = req.params?.[key];

    if (!req.user || !id) throw new UnauthorizedError("User does not have access to this game.");

    const game = await prisma.game.findUnique({ where: { id } });

    if (!game || game.authorId !== req.user.id) throw new UnauthorizedError("User does not have access to this game.");

    return next();
  };
}
