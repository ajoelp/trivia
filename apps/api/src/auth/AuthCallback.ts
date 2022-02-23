import { Request, Response } from "express";
import { getUserFromAccountCode } from "../services/google-auth";
import { createToken } from "../services/json-service";

const towDaysToSeconds = 48 * 60 * 60;

export async function AuthCallback(req: Request, res: Response) {
  const { code } = req.query;
  const user = await getUserFromAccountCode(code as string);

  if (!user) {
    return res.send();
  }

  return res
    .cookie("AUTH_TOKEN", createToken(user), {
      maxAge: towDaysToSeconds,
    })
    .redirect(process.env.CLIENT_URL as string);
}
