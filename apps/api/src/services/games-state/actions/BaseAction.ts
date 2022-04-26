import { TriviaActions } from "@trivia/shared/events";
import { GameState } from "../GameState";
import { prisma } from "../../../../prisma";
import { GameState as BaseGameState } from "@trivia/shared/types";
import { Game, Prisma } from "@prisma/client";
import NotFoundError from "@src/exceptions/NotFoundError";

type UpdateGameStateCallback = (state: GameState) => Promise<GameState>;

export abstract class BaseAction {
  code: string;
  _game: Game | undefined;

  constructor(code: string) {
    this.code = code;
  }

  abstract process(action: TriviaActions): Promise<Game>;

  async updateGameState(callback: UpdateGameStateCallback) {
    let game = await this.getGame();

    if (!game) throw new NotFoundError(`No game found for code ${this.code}`);

    const gameState = game.state as Record<string, any>;

    const state = GameState.fromJson(gameState as BaseGameState);
    const updatedState = await callback(state);

    game = await prisma.game.update({
      where: { code: this.code },
      data: { state: updatedState.toJson() as unknown as Prisma.JsonObject },
    });

    return game;
  }

  async game(): Promise<Game> {
    if (!this._game) {
      this._game = await this.getGame();
    }

    return this._game;
  }

  private getGame() {
    return prisma.game.findUnique({ where: { code: this.code } });
  }
}
