import { Game } from "@prisma/client";
import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { ShowScoresAction } from "@trivia/shared/events";
import { GameStates } from "@trivia/shared/types";

export class ShowScores extends BaseAction {
  process(action: ShowScoresAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      state.setGameState(GameStates.SHOWING_SCORES);
      return state;
    });
  }
}
