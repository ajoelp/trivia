import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { ApiRequest } from "../types/Api";

export async function GetGames(req: Request, res: Response) {
  return res.json(await prisma.game.findMany());
}

export async function GetGame(req: Request, res: Response) {
  return res.json(await prisma.game.findUnique({ where: { id: req.params.id } }));
}

export async function CreateGame(req: ApiRequest, res: Response) {
  return res.status(201).json(
    await prisma.game.create({
      data: {
        ...req.body,
        code: "test123",
        author: { connect: { id: req.user.id } },
        state: {},
      },
    }),
  );
}
