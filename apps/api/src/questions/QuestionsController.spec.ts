import { Game, Question, User } from "@prisma/client";
import { UserFactory } from "../testing/factories/UserFactory";
import { GameFactory } from "../testing/factories/GameFactory";
import { QuestionFactory } from "../testing/factories/QuestionFactory";
import { TestCase } from "../testing/Testcase";
import { prisma } from "../../prisma";

const testcase = TestCase.make();

describe("QuestionsController", () => {
  let game: Game;
  let user: User;

  beforeEach(async () => {
    user = await UserFactory.create();
    game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });
  });

  describe("list", () => {
    let questions: Question[];

    beforeEach(async () => {
      questions = await QuestionFactory.createMany(10, { game: { connect: { id: game.id } } });
    });

    it("will list questions", async () => {
      const response = await testcase.actingAs(user).get(`/games/${game.id}/questions`);
      expect(response.json).toEqual(
        expect.arrayContaining(
          questions.map((question) =>
            expect.objectContaining({
              id: question.id,
            }),
          ),
        ),
      );
    });
    it("will only list questions in a game", async () => {
      const secondGame = await GameFactory.create({ author: { connect: { id: user.id } } });
      const otherQuestions = await QuestionFactory.createMany(5, { game: { connect: { id: secondGame.id } } });

      const response = await testcase.actingAs(user).get(`/games/${game.id}/questions`);

      expect(response.json).toEqual(
        expect.arrayContaining(
          questions.map((question) =>
            expect.objectContaining({
              id: question.id,
            }),
          ),
        ),
      );
      expect(response.json).not.toEqual(
        expect.arrayContaining(
          otherQuestions.map((question) =>
            expect.objectContaining({
              id: question.id,
            }),
          ),
        ),
      );
    });
  });

  describe("fetch", () => {
    it("will fetch a question", async () => {
      const question = await QuestionFactory.create({ game: { connect: { id: game.id } } });
      const response = await testcase.actingAs(user).get(`/games/${game.id}/questions/${question.id}`);
      expect(response.json).toEqual(expect.objectContaining({ id: question.id }));
    });
  });

  describe("create", () => {
    it("will create a question", async () => {
      const payload: Partial<Question> = {
        value: "this is the question",
        answer: "this is the answer",
        difficulty: "easy",
      };

      const response = await testcase.actingAs(user).post(`/games/${game.id}/questions`, payload);
      expect(response.json).toEqual(expect.objectContaining(payload));

      expect(
        await prisma.question.findFirst({
          where: {
            ...payload,
            gameId: game.id,
          },
        }),
      ).toBeTruthy();
    });
  });

  describe("update", () => {
    it("will update a question", async () => {
      const question = await QuestionFactory.create({ game: { connect: { id: game.id } } });

      const payload: Partial<Question> = {
        value: "this is the question",
        answer: "this is the answer",
        difficulty: "easy",
      };

      const response = await testcase.actingAs(user).patch(`/games/${game.id}/questions/${question.id}`, payload);
      expect(response.json).toEqual(expect.objectContaining(payload));

      expect(
        await prisma.question.findUnique({
          where: {
            id: question.id,
          },
        }),
      ).toEqual(expect.objectContaining(payload));
    });
  });

  describe("destroy", () => {
    it("will destroy a question", async () => {
      const question = await QuestionFactory.create({ game: { connect: { id: game.id } } });
      await testcase.actingAs(user).delete(`/games/${game.id}/questions/${question.id}`);
      expect(await prisma.question.findUnique({ where: { id: question.id } })).toBeNull();
    });
  });
});
