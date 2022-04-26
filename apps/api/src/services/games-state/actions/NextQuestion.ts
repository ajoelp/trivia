import { Game } from "@prisma/client";
import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { NextQuestionAction } from "@trivia/shared/events";
import { GameStates } from "@trivia/shared/types";
import { prisma } from "@prisma-client";
import { QuestionNotFoundException } from "@src/services/games-state/actions/QuestionNotFoundException";

export class NextQuestion extends BaseAction {
  process(action: NextQuestionAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      const nextQuestion = await this.getNextQuestion(state.answers.answeredQuestionIds());
      if (!nextQuestion) {
        throw new QuestionNotFoundException();
      }

      state.setGameState(GameStates.QUESTION_ASKED);
      state.setCurrentQuestionId(nextQuestion.id);
      return state;
    });
  }

  private async getNextQuestion(alreadyAnswered: string[]) {
    return prisma.question.findFirst({
      where: {
        gameId: (await this.game()).id,
        NOT: alreadyAnswered.map((id) => ({ id })),
      },
    });
  }
}
