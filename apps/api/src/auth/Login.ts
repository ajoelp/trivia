import { Request, Response } from "express";
import { GoogleAuth } from "../services/google-auth";

export function Login(req: Request, res: Response) {
  return res.redirect(GoogleAuth.make().getConnectionUrl());
}
