import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { CreateTeamAction } from "@trivia/shared/events";
import { Game } from "@prisma/client";

export class CreateTeam extends BaseAction {
  process(action: CreateTeamAction): Promise<Game> {
    return this.updateGameState(async (state) => {
      state.teams.addTeam(action.payload.name);
      return state;
    });
  }
}
