import { GameTeams } from "./GameTeams";
import { GameAnswers } from "./GameAnswers";
import { GameStates, GameState as BaseGameState } from "@trivia/shared/types";

export class GameState {
  state: GameStates = GameStates.PENDING;
  teams = new GameTeams();
  answers = new GameAnswers();
  currentQuestionId: string | undefined;

  parse(state: BaseGameState): this {
    this.setGameState(state.state);
    this.setCurrentQuestionId(state.currentQuestionId);
    this.teams.fromJson(state.teams);
    this.answers.fromJson(state.answers);
    return this;
  }

  setGameState(state: GameStates) {
    this.state = state;
  }

  setCurrentQuestionId(questionId?: string) {
    this.currentQuestionId = questionId;
  }

  static fromJson(state: BaseGameState) {
    return new GameState().parse(state);
  }

  toJson(): BaseGameState {
    return {
      state: this.state,
      answers: this.answers.toJson(),
      teams: this.teams.toArray(),
      currentQuestionId: this.currentQuestionId,
    };
  }
}
