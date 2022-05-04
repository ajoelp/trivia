import { AnswerQuestion } from "@src/services/games-state/actions/AnswerQuestion";
import { QuestionNotFoundException } from "@src/services/games-state/actions/QuestionNotFoundException";
import { GameFactory } from "@src/testing/factories/GameFactory";
import { UserFactory } from "@src/testing/factories/UserFactory";
import { QuestionFactory } from "@src/testing/factories/QuestionFactory";
import { GameState as GameStateClass } from "@src/services/games-state/GameState";
import { prisma } from "@prisma-client";
import { InvalidQuestionException } from "@src/services/games-state/actions/InvalidQuestionException";
import { GameState } from "@trivia/shared/types";

describe("AnswerQuestion", function () {
  it("will throw an error if the question does not exist", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });
    const instance = new AnswerQuestion(game.code);

    await expect(() =>
      instance.process({
        type: "answer-question-action",
        payload: {
          questionId: "random-question-id",
          answer: "this is the answer",
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

    const instance = new AnswerQuestion(game.code);

    await expect(() =>
      instance.process({
        type: "answer-question-action",
        payload: {
          questionId: question2.id,
          answer: "this is the answer",
          teamId: "team-id",
        },
      }),
    ).rejects.toThrow(InvalidQuestionException);
  });

  it("will answer the question", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });
    const question = await QuestionFactory.create({
      game: { connect: { id: game.id } },
    });

    const state = new GameStateClass();
    state.setCurrentQuestionId(question.id);
    await prisma.game.update({ where: { code: game.code }, data: { state: state.toJson() as any } });

    const instance = new AnswerQuestion(game.code);

    const payload = {
      questionId: question.id,
      answer: "this is the answer",
      teamId: "team-id-123",
    };

    await instance.process({
      type: "answer-question-action",
      payload,
    });

    const freshGame = await prisma.game.findUnique({ where: { code: game.code } });

    expect(freshGame.state).toMatchObject<Partial<GameState>>({
      answers: [
        {
          questionId: question.id,
          answers: { [payload.teamId]: { answer: payload.answer } },
        },
      ],
    });
  });
});
