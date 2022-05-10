import { Game, GameState, Question } from "@trivia/shared/types";
import { GameSocket } from "../../../services/GameSocket";

export interface GameStateProps {
  game: Game;
  instance: GameSocket;
  gameState: GameState;
  question?: Question;
}
