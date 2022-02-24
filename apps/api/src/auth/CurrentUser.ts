import { Request, Response } from "express";
import NotFoundError from "../exceptions/NotFoundError";
import { ApiRequest } from "../types/Api";

export function CurrentUser(req: ApiRequest, res: Response) {
  if (!req.user) throw new NotFoundError();

  return res.json(req.user);
}
