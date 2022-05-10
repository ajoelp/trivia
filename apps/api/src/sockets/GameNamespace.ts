import { Namespace, Server, Socket } from "socket.io";
import { prisma } from "../../prisma";
import { GameEvents } from "./GameEvents";
import { Game, User } from "@prisma/client";
import { Game as GameType } from "@trivia/shared/types";
import { userFromToken } from "@src/services/json-service";

const parseOrDont = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

type GameClients = Map<string, GameEvents>;
export class GameNamespaceService {
  REGEX = /\/(.*)/;
  namespace: Namespace;

  games: GameClients = new Map();

  start(io: Server) {
    this.namespace = io.of(this.REGEX);

    this.namespace.on("connection", async (socket) => {
      await this.onConnection(socket);

      socket.on("disconnect", () => {
        this.onDisconnect(socket);
      });
    });
  }

  getGameCode(socket: Socket): string | undefined {
    return socket.nsp.name.match(this.REGEX)?.[1];
  }

  async onConnection(socket: Socket): Promise<void> {
    const code = this.getGameCode(socket);

    const existingGame = await GameNamespaceService.hasExistingGame(code);

    const user = await GameNamespaceService.getUserFromAuthorization(socket.handshake.headers.authorization);

    if (!code || !existingGame) {
      socket.disconnect();
      return;
    }

    if (!this.games.has(code)) {
      this.games.set(code, new GameEvents(code));
    }

    const events = this.games.get(code);

    events.addClient(socket);

    socket.emit("game-state", await events.getGameState());
    socket.emit("game", GameNamespaceService.formatGame(existingGame, user));

    socket.on("action", async (event: string) => {
      try {
        const eventData = parseOrDont(event);
        await events.processAction(eventData);
      } catch (e) {
        socket.emit("client-error", e.message);
      }
    });
  }

  onDisconnect(socket: Socket): void {
    const code = this.getGameCode(socket);

    if (!this.games.has(code)) return;

    this.games.get(code).removeClient(socket);

    if (this.games.get(code).isEmpty) {
      this.games.delete(code);
    }
  }

  totalConnectedClients() {
    return [...this.games.values()].reduce((carry, gameInstance) => carry + gameInstance.clients.length, 0);
  }

  private static formatGame(game: Game, user?: User): GameType {
    return {
      ...game,
      state: game.state as unknown as Record<string, any>,
      createdAt: game.createdAt.toString(),
      isOwner: user?.id === game.authorId,
    };
  }

  private static async hasExistingGame(code: string): Promise<Game> {
    return await prisma.game.findUnique({ where: { code } });
  }

  private static async getUserFromAuthorization(authorization: string | undefined) {
    if (!authorization) return null;
    return userFromToken(authorization);
  }
}

export const GameNamespace = new GameNamespaceService();
