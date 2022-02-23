import { prisma } from "../prismaClient";
import { User } from "@prisma/client";

const userQuery = prisma.user;

export async function findOrCreateUser(email: string): Promise<User> {
  let user = await userQuery.findUnique({ where: { email } });
  if (!user) {
    user = await userQuery.create({ data: { email } });
  }
  return user;
}
