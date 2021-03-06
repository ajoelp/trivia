import { prisma } from "../../prisma";
import { User } from "@prisma/client";

const userQuery = prisma.user;

export async function findOrCreateUser(email: string): Promise<User> {
  let user = await userQuery.findUnique({ where: { email } });
  if (!user) {
    user = await userQuery.create({ data: { email } });
  }
  return user;
}

export async function findUserById(id: string): Promise<User> {
  return await userQuery.findUnique({ where: { id } });
}
