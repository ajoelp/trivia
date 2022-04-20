import { Difficulty, Question } from "@trivia/shared/types";
import { BaseFactory } from "./BaseFactory";
import { randText, randUuid, rand } from "@ngneat/falso";

export const QuestionFactory: BaseFactory<Question> = {
  build: (attrs = {}) => {
    return {
      id: randUuid(),
      value: randText(),
      answer: randText(),
      difficulty: rand(Object.values(Difficulty)),
      gameId: randUuid(),
      createdAt: new Date().toISOString(),
      ...attrs,
    } as Question;
  },
  buildMany: (count: number, attrs) => {
    return Array.from({ length: count }).map(() => QuestionFactory.build(attrs));
  },
};
