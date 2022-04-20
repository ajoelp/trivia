import { Game } from "@trivia/shared/types";
import { BaseFactory } from "./BaseFactory";
import { randEmail, randText, randUuid } from "@ngneat/falso";

export const GameFactory: BaseFactory<Game> = {
  build: (attrs = {}) => {
    return {
      id: randUuid(),
      name: randEmail(),
      code: randText(),
      active: true,
      state: {},
      authorId: randUuid(),
      createdAt: new Date().toISOString(),
      ...attrs,
    } as Game;
  },
  buildMany: (count: number, attrs) => {
    return Array.from({ length: count }).map(() => GameFactory.build(attrs));
  },
};
