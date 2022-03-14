import { Response } from "express";
import { GoogleAuth } from "../services/google-auth";
import { createToken } from "../services/json-service";
import { ApiRequest } from "../types/Api";
import ms from "ms";

export async function AuthCallback(req: ApiRequest, res: Response) {
  const { code } = req.query;
  const user = await GoogleAuth.make().getUserFromAccountCode(code as string);

  if (!user) {
    return res.send();
  }

  return res
    .cookie("AUTH_TOKEN", createToken(user), {
      maxAge: ms("2 days"),
    })
    .redirect(process.env.CLIENT_URL as string);
}
