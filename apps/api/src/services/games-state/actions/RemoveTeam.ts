import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { Game } from "@prisma/client";
import { RemoveTeamAction } from "@trivia/shared/events";

export class RemoveTeam extends BaseAction {
  process(action: RemoveTeamAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      state.teams.removeTeam(action.payload.id);
      return state;
    });
  }
}
