import { Game } from "@prisma/client";
import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { FinalReportAction } from "@trivia/shared/events";
import { GameStates } from "@trivia/shared/types";

export class FinalReport extends BaseAction {
  process(action: FinalReportAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      state.setGameState(GameStates.COMPLETE);
      return state;
    });
  }
}
