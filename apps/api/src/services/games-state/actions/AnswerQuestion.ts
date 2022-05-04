import { Game } from "@prisma/client";
import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { AnswerQuestionAction } from "@trivia/shared/events";
import { prisma } from "@prisma-client";
import { QuestionNotFoundException } from "@src/services/games-state/actions/QuestionNotFoundException";
import { InvalidQuestionException } from "@src/services/games-state/actions/InvalidQuestionException";

export class AnswerQuestion extends BaseAction {
  process(action: AnswerQuestionAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      const question = await prisma.question.findFirst({
        where: { id: action.payload.questionId, game: { code: this.code } },
      });

      if (!question) throw new QuestionNotFoundException();
      if (question.id !== state.currentQuestionId) throw new InvalidQuestionException();

      state.answers.answerQuestion(action.payload.questionId, action.payload.teamId, action.payload.answer);

      return state;
    });
  }
}
