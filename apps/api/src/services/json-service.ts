import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWT_SECRET } from "../config";
import UnauthorizedError from "../exceptions/UnauthorizedError";
import { findUserById } from "./users-service";

export function createToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
  );
}

export async function userFromToken(token: string): Promise<User | null> {
  const tokenValue = token.split(" ")?.[1] ?? null;

  if (tokenValue == null) return null;

  try {
    const { id } = jwt.verify(tokenValue, JWT_SECRET) as JwtPayload;
    return await findUserById(id);
  } catch (e) {
    throw new UnauthorizedError(e.message);
  }
}
