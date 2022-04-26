import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { GameStates } from "@trivia/shared/types";
import { Game } from "@prisma/client";

export class StartGame extends BaseAction {
  process(): Promise<Game> {
    return this.updateGameState(async (state) => {
      state.setGameState(GameStates.STARTED);
      return state;
    });
  }
}
