import { Game } from "../../types/models";
import { BaseFactory } from "./BaseFactory";
import { randEmail, randText } from "@ngneat/falso";

export const GameFactory: BaseFactory<Game> = {
  build: (attrs = {}) => {
    return {
      name: randEmail(),
      code: randText(),
      active: true,
      state: {},
      authorId: "rand-id",
      ...attrs,
    } as Game;
  },
  buildMany: (count: number, attrs) => {
    return Array.from({ length: count }).map(() => GameFactory.build(attrs));
  },
};
