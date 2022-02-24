import { Request } from "express";
import { User } from "@prisma/client";
export interface ApiRequest extends Request {
  user?: User;
}
