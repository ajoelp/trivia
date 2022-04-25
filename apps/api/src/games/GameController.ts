import { Response } from "express";
import { prisma } from "../../prisma";
import { ApiRequest } from "../types/Api";
import { generateGameCode } from "../services/generateGameCode";
import { GameState } from "../services/games-state/GameState";

export async function GetGames(req: ApiRequest, res: Response) {
  return res.json(
    await prisma.game.findMany({
      where: { authorId: req.user.id },
      orderBy: { createdAt: "desc" },
    }),
  );
}

export async function GetGame(req: ApiRequest, res: Response) {
  return res.json(await prisma.game.findUnique({ where: { id: req.params.id } }));
}

export async function CreateGame(req: ApiRequest, res: Response) {
  return res.status(201).json(
    await prisma.game.create({
      data: {
        ...req.body,
        code: await generateGameCode(),
        author: { connect: { id: req.user.id } },
        state: new GameState().toJson(),
      },
    }),
  );
}

export async function UpdateGame(req: ApiRequest, res: Response) {
  return res.json(
    await prisma.game.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    }),
  );
}
