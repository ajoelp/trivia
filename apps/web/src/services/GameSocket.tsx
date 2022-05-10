import {
  ANSWER_QUESTION,
  AnswerQuestionAction,
  CREATE_TEAM,
  CreateTeamAction,
  FINAL_REPORT,
  GRADE_QUESTION,
  GradeQuestionAction,
  NEXT_QUESTION,
  SHOW_SCORES,
  START_EVALUATING,
  START_GAME,
  TriviaActions,
} from "@trivia/shared/events";
import { Game, GameState } from "@trivia/shared/types";
import { io, Socket } from "socket.io-client";
import { Config } from "../config";
import Cookies from "js-cookie";

type Closure<T> = (a: T) => void;

export class GameSocket {
  socket: Socket;
  gameStateListener?: Closure<GameState>;
  clientErrorListener?: Closure<string>;
  connectionChangeListener?: Closure<Socket>;
  gameListener?: Closure<Game>;

  constructor(code: string) {
    const tokenCookie = Cookies.get("AUTH_TOKEN");
    this.socket = io(`${Config.apiUrl}/${code}`, {
      withCredentials: true,
      extraHeaders: {
        Authorization: tokenCookie ? `Bearer ${tokenCookie}` : "",
      },
    });
    this.initialize();
  }

  initialize() {
    this.socket.on("connect", () => {
      this.connectionChangeListener?.(this.socket);
    });

    this.socket.on("game-state", (e: GameState) => {
      this.gameStateListener?.(e);
    });

    this.socket.on("game", (e: Game) => {
      this.gameListener?.(e);
    });

    this.socket.on("client-error", (message: string) => {
      this.clientErrorListener?.(message);
    });

    this.socket.on("disconnect", () => {
      this.connectionChangeListener?.(this.socket);
    });
  }

  listenGameState(listener: Closure<GameState>) {
    this.gameStateListener = listener;
    return this;
  }

  listenClientError(listener: Closure<string>) {
    this.clientErrorListener = listener;
    return this;
  }

  listenConnectionChange(listener: Closure<Socket>) {
    this.connectionChangeListener = listener;
    return this;
  }

  listenGame(listener: Closure<Game>) {
    this.gameListener = listener;
    return this;
  }

  startGame() {
    this.sendEvent({ type: START_GAME });
  }

  startEvaluating() {
    this.sendEvent({ type: START_EVALUATING });
  }

  showScores() {
    this.sendEvent({ type: SHOW_SCORES });
  }

  finalReport() {
    this.sendEvent({ type: FINAL_REPORT });
  }

  nextQuestion() {
    this.sendEvent({ type: NEXT_QUESTION });
  }

  answerQuestion(payload: AnswerQuestionAction["payload"]) {
    this.sendEvent({
      type: ANSWER_QUESTION,
      payload,
    });
  }

  gradeQuestion(payload: GradeQuestionAction["payload"]) {
    this.sendEvent({
      type: GRADE_QUESTION,
      payload,
    });
  }

  createTeam(payload: CreateTeamAction["payload"]) {
    this.sendEvent({
      type: CREATE_TEAM,
      payload,
    });
  }

  sendEvent(action: TriviaActions) {
    this.socket.emit("action", action);
  }
}
