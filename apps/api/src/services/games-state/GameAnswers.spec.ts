import { GameAnswers } from "./GameAnswers";
import { QuestionAnswers, Answer } from "@trivia/shared/types";

describe("GameAnswers", () => {
  it("will answer a new question", () => {
    const instance = new GameAnswers();
    instance.answerQuestion("question-id", "team-id", "this-is-the-answer");
    expect(instance.toJson()).toEqual([
      {
        questionId: "question-id",
        answers: { "team-id": { answer: "this-is-the-answer" } },
      },
    ]);
  });

  it("will update an existing answer", () => {
    const answer: QuestionAnswers = {
      questionId: "question-id",
      answers: { "team-id": { answer: "answer " } },
    };
    const instance = new GameAnswers();
    instance.fromJson([answer]);

    instance.answerQuestion("question-id", "team-id", "new-answer");
    expect(instance.toJson()).toEqual([
      {
        questionId: answer.questionId,
        answers: { "team-id": { answer: "new-answer" } },
      },
    ]);
  });

  it("will grade an existing answer", () => {
    const answer: QuestionAnswers = {
      questionId: "question-id",
      answers: { "team-id": { answer: "answer" } },
    };
    const instance = new GameAnswers();
    instance.fromJson([answer]);

    instance.gradeQuestion("question-id", "team-id", false);
    expect(instance.toJson()).toEqual([
      {
        questionId: answer.questionId,
        answers: { "team-id": { answer: "answer", isCorrect: false } },
      },
    ]);
  });
});
