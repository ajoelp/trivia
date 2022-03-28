import { ApiRequest } from "../types/Api";
import { Response } from "express";
import { prisma } from "../../prisma";
import { StatusCodes } from "../services/StatusCodes";

export async function list(req: ApiRequest, res: Response) {
  const questions = await prisma.question.findMany({
    where: { gameId: req.params.gameId },
  });
  return res.json(questions);
}

export async function fetch(req: ApiRequest, res: Response) {
  const question = await prisma.question.findUnique({ where: { id: req.params.id } });
  return res.json(question);
}

export async function create(req: ApiRequest, res: Response) {
  const question = await prisma.question.create({
    data: {
      ...req.body,
      gameId: req.params.gameId,
    },
  });
  return res.json(question).status(StatusCodes.HTTP_CREATED);
}

export async function update(req: ApiRequest, res: Response) {
  const question = await prisma.question.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return res.json(question);
}

export async function destroy(req: ApiRequest, res: Response) {
  await prisma.question.delete({
    where: { id: req.params.id },
  });
  return res.send(null).status(StatusCodes.HTTP_NO_CONTENT);
}
