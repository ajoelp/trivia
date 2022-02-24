import { Prisma, User } from "@prisma/client";
import { BaseFactory } from "./BaseFactory";
import { randEmail } from "@ngneat/falso";
import { prisma } from "../../prismaClient";

export const UserFactory: BaseFactory<Prisma.UserCreateArgs["data"], User> = {
  build: (attrs = {}) => {
    return {
      email: randEmail(),
      ...attrs,
    };
  },
  create: async (attrs) => {
    return await prisma.user.create({ data: UserFactory.build(attrs) });
  },
  createMany: async (count: number, attrs) => {
    return await prisma.$transaction(
      Array.from({ length: count }).map(() => prisma.user.create({ data: UserFactory.build(attrs) })),
    );
  },
};
