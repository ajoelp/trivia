import { GameFactory } from "@src/testing/factories/GameFactory";
import { QuestionFactory } from "@src/testing/factories/QuestionFactory";
import { UserFactory } from "@src/testing/factories/UserFactory";
import { GRADE_QUESTION } from "@trivia/shared/events";
import { GradeQuestion } from "./GradeQuestion";
import { QuestionNotFoundException } from "./QuestionNotFoundException";
import { GameState as GameStateClass } from "@src/services/games-state/GameState";
import { prisma } from "@prisma-client";
import { InvalidQuestionException } from "./InvalidQuestionException";
import { GameState } from "@trivia/shared/types";

describe("GradeQuestion", () => {
  it("will throw an error if the question does not exist", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });
    const instance = new GradeQuestion(game.code);

    await expect(() =>
      instance.process({
        type: GRADE_QUESTION,
        payload: {
          questionId: "random-question-id",
          isCorrect: true,
          teamId: "team-id",
        },
      }),
    ).rejects.toThrow(QuestionNotFoundException);
  });

  it("will throw an error if it is not the current question", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });
    const [question1, question2] = await QuestionFactory.createMany(2, {
      game: { connect: { id: game.id } },
    });

    const state = new GameStateClass();
    state.setCurrentQuestionId(question1.id);
    await prisma.game.update({ where: { code: game.code }, data: { state: state.toJson() as any } });

    const instance = new GradeQuestion(game.code);

    await expect(() =>
      instance.process({
        type: GRADE_QUESTION,
        payload: {
          questionId: question2.id,
          isCorrect: true,
          teamId: "team-id",
        },
      }),
    ).rejects.toThrow(InvalidQuestionException);
  });

  it.each([true, false])("will grade a question %s", async (value) => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });
    const question = await QuestionFactory.create({
      game: { connect: { id: game.id } },
    });

    const state = new GameStateClass();
    state.setCurrentQuestionId(question.id);
    await prisma.game.update({ where: { code: game.code }, data: { state: state.toJson() as any } });

    const instance = new GradeQuestion(game.code);

    await instance.process({
      type: GRADE_QUESTION,
      payload: {
        questionId: question.id,
        isCorrect: value,
        teamId: "team-id",
      },
    });

    expect((await prisma.game.findUnique({ where: { id: game.id } })).state).toMatchObject<Partial<GameState>>({
      answers: [
        {
          questionId: question.id,
          answers: {
            "team-id": { isCorrect: value },
          },
        },
      ],
    });
  });
});
