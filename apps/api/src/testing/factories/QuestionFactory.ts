import { Prisma, Question } from "@prisma/client";
import { BaseFactory } from "./BaseFactory";
import { randText, rand } from "@ngneat/falso";
import { prisma } from "../../../prisma";

export const QuestionFactory: BaseFactory<Prisma.QuestionCreateInput, Question> = {
  build: (attrs = {}) => {
    return {
      value: randText(),
      answer: randText(),
      difficulty: rand(["easy", "medium", "hard"]),
      ...attrs,
    } as Prisma.QuestionCreateInput;
  },
  create: async (attrs) => {
    return await prisma.question.create({ data: QuestionFactory.build(attrs) });
  },
  createMany: async (count: number, attrs) => {
    return await prisma.$transaction(
      Array.from({ length: count }).map(() => prisma.question.create({ data: QuestionFactory.build(attrs) })),
    );
  },
};
