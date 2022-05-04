import { Socket } from "socket.io";
import {
  ANSWER_QUESTION,
  FINAL_REPORT,
  GRADE_QUESTION,
  NEXT_QUESTION,
  SHOW_SCORES,
  START_EVALUATING,
  START_GAME,
  TriviaActions,
} from "@trivia/shared/events";
import { BaseAction } from "@src/services/games-state/actions/BaseAction";
import { AnswerQuestion } from "@src/services/games-state/actions/AnswerQuestion";
import { FinalReport } from "@src/services/games-state/actions/FinalReport";
import { GradeQuestion } from "@src/services/games-state/actions/GradeQuestion";
import { NextQuestion } from "@src/services/games-state/actions/NextQuestion";
import { ShowScores } from "@src/services/games-state/actions/ShowScores";
import { StartEvaluating } from "@src/services/games-state/actions/StartEvaluating";
import { StartGame } from "@src/services/games-state/actions/StartGame";
import { GameState } from "@trivia/shared/types";
import { prisma } from "@prisma-client";

type ActionContructor = new (code: string) => BaseAction;

const ActionMap: Record<TriviaActions["type"], ActionContructor> = {
  [START_GAME]: StartGame,
  [NEXT_QUESTION]: NextQuestion,
  [ANSWER_QUESTION]: AnswerQuestion,
  [START_EVALUATING]: StartEvaluating,
  [GRADE_QUESTION]: GradeQuestion,
  [SHOW_SCORES]: ShowScores,
  [FINAL_REPORT]: FinalReport,
};

export class GameEvents {
  code: string;
  clients: Socket[] = [];

  constructor(code: string) {
    this.code = code;
  }

  addClient(socket: Socket) {
    this.clients.push(socket);
  }

  addClients(sockets: Socket[]) {
    this.clients.push(...sockets);
  }

  removeClient(socket: Socket) {
    const currentIndex = this.clients.findIndex((client) => client.id === socket.id);
    if (currentIndex < 0) return;
    this.clients.splice(currentIndex, 1);
  }

  async processAction(action: TriviaActions) {
    console.log(typeof action);

    if (!ActionMap[action?.type]) {
      throw new Error(`Invalid action ${action.type ?? "unknown"}`);
    }

    const instance = new ActionMap[action.type](this.code);
    const game = await instance.process(action);
    this.broadcastGameState(game.state as unknown as GameState);
    return game;
  }

  broadcastMessage(action: TriviaActions) {
    this.clients.forEach((client) => {
      client.emit("message", action);
    });
  }

  broadcastGameState(state: GameState) {
    this.clients.forEach((client) => {
      client.emit("game-state", state);
    });
  }

  async getGameState(): Promise<GameState> {
    return (await prisma.game.findUnique({ where: { code: this.code } })).state as unknown as GameState;
  }

  get isEmpty() {
    return this.clients.length <= 0;
  }
}
