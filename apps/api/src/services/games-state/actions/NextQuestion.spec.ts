import { UserFactory } from "@src/testing/factories/UserFactory";
import { GameFactory } from "@src/testing/factories/GameFactory";
import { NextQuestion } from "@src/services/games-state/actions/NextQuestion";
import { QuestionFactory } from "@src/testing/factories/QuestionFactory";
import { prisma } from "@prisma-client";
import { GameState, GameStates } from "@trivia/shared/types";
import { GameState as GameStateClass } from "../GameState";
import { QuestionNotFoundException } from "@src/services/games-state/actions/QuestionNotFoundException";

describe("NextQuestion", () => {
  it("will get the next question and save it to state", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const question = await QuestionFactory.create({ game: { connect: { id: game.id } } });
    const instance = new NextQuestion(game.code);
    await instance.process({ type: "next-question-action" });

    expect(await prisma.game.findUnique({ where: { code: game.code } })).toEqual(
      expect.objectContaining({
        state: expect.objectContaining<Partial<GameState>>({
          state: GameStates.QUESTION_ASKED,
          currentQuestionId: question.id,
        }),
      }),
    );
  });

  it("will not get an already answered question", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const [question, question2] = await QuestionFactory.createMany(2, { game: { connect: { id: game.id } } });

    const state = new GameStateClass();
    state.answers.answerQuestion(question.id, "random-team", "random-answer");
    await prisma.game.update({ where: { code: game.code }, data: { state: state.toJson() as any } });

    const instance = new NextQuestion(game.code);
    await instance.process({ type: "next-question-action" });

    expect(await prisma.game.findUnique({ where: { code: game.code } })).toEqual(
      expect.objectContaining({
        state: expect.objectContaining<Partial<GameState>>({
          state: GameStates.QUESTION_ASKED,
          currentQuestionId: question2.id,
        }),
      }),
    );
  });

  it("will throw an error if there are no questions left", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const [question, question2] = await QuestionFactory.createMany(2, { game: { connect: { id: game.id } } });

    const state = new GameStateClass();
    state.answers.answerQuestion(question.id, "random-team", "random-answer");
    state.answers.answerQuestion(question2.id, "random-team", "random-answer");
    await prisma.game.update({ where: { code: game.code }, data: { state: state.toJson() as any } });

    const instance = new NextQuestion(game.code);
    await expect(() => instance.process({ type: "next-question-action" })).rejects.toThrow(QuestionNotFoundException);
  });
});
