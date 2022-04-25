import { Namespace, Server, Socket } from "socket.io";
import { prisma } from "../../prisma";
import { GameEvents } from "./GameEvents";

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

    if (!code || !(await GameNamespaceService.hasExistingGame(code))) {
      socket.disconnect();
      return;
    }

    if (!this.games.has(code)) {
      this.games.set(code, new GameEvents(code));
    }

    this.games.get(code).addClient(socket);
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

  private static async hasExistingGame(code: string): Promise<boolean> {
    return Boolean(await prisma.game.findUnique({ where: { code } }));
  }

  private debugLog() {
    const games = Object.entries(this.games).reduce((carry, [code, clients]) => {
      return { ...carry, [code]: clients?.length ?? 0 };
    }, {});
  }
}

export const GameNamespace = new GameNamespaceService();
