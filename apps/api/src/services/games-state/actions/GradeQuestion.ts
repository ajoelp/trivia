import { prisma } from "@prisma-client";
import { Game } from "@prisma/client";
import { GradeQuestionAction } from "@trivia/shared/events";
import { BaseAction } from "./BaseAction";
import { InvalidQuestionException } from "./InvalidQuestionException";
import { QuestionNotFoundException } from "./QuestionNotFoundException";

export class GradeQuestion extends BaseAction {
  process(action: GradeQuestionAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      const question = await prisma.question.findFirst({
        where: { id: action.payload.questionId, game: { code: this.code } },
      });

      if (!question) throw new QuestionNotFoundException();
      if (question.id !== state.currentQuestionId) throw new InvalidQuestionException();

      state.answers.gradeQuestion(action.payload.questionId, action.payload.teamId, action.payload.isCorrect);

      return state;
    });
  }
}
