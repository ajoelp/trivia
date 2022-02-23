import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWT_SECRET } from "../config";

export function createToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "2 days" },
  );
}
