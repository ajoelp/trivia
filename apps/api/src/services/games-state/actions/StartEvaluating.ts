import { Game } from "@prisma/client";
import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { StartEvaluatingAction, TriviaActions } from "@trivia/shared/events";
import { GameStates } from "@trivia/shared/types";

export class StartEvaluating extends BaseAction {
  process(action: StartEvaluatingAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      state.setGameState(GameStates.HOST_EVALUATING);
      return state;
    });
  }
}
