import { Request, Response } from "express";
import { prisma } from "../../prisma";

export async function GetGames(req: Request, res: Response) {
  return res.json(await prisma.game.findMany());
}

export async function GetGame(req: Request, res: Response) {
  return res.json(await prisma.game.findUnique({ where: { id: req.params.id } }));
}
