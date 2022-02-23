import { Request, Response } from "express";
import {getConnectionUrl} from "../services/google-auth";

export function Login(req: Request, res: Response) {
  return res.redirect(getConnectionUrl());
}
