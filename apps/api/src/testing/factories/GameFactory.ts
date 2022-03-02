import { Prisma, Game } from "@prisma/client";
import { BaseFactory } from "./BaseFactory";
import { randText, randEmail } from "@ngneat/falso";
import { prisma } from "../../../prisma";

export const GameFactory: BaseFactory<Prisma.GameCreateInput, Game> = {
  build: (attrs = {}) => {
    return {
      name: randEmail(),
      code: randText(),
      active: true,
      state: {},
      ...attrs,
    } as Prisma.GameCreateInput;
  },
  create: async (attrs) => {
    return await prisma.game.create({ data: GameFactory.build(attrs) });
  },
  createMany: async (count: number, attrs) => {
    return await prisma.$transaction(
      Array.from({ length: count }).map(() => prisma.game.create({ data: GameFactory.build(attrs) })),
    );
  },
};
