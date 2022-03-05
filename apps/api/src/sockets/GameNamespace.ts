import { Namespace, Server, Socket } from "socket.io";
import { prisma } from "../../prisma";

type GameClients = Record<string, Socket[]>;

export class GameNamespaceService {
  REGEX = /\/(.*)/;
  namespace: Namespace;

  _games: GameClients = {};

  start(io: Server) {
    this.namespace = io.of(this.REGEX);

    this.namespace.on("connection", (socket) => {
      this.onConnection(socket);
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
    if (!code || !(await this.hasExistingGame(code))) {
      socket.disconnect();
      return;
    }
    this._games[code] = [...(this._games[code] ?? []), socket];
  }

  onDisconnect(socket: Socket): void {
    const code = this.getGameCode(socket);
    const currentIndex = this._games[code]?.findIndex((client) => client.id === socket.id) ?? -1;
    if (currentIndex < 0) return;
    this._games[code].splice(currentIndex, 1);
  }

  totalConnectedClients() {
    return Object.values(this._games).reduce((carry, clients) => carry + clients.length, 0);
  }

  private async hasExistingGame(code: string): Promise<boolean> {
    return Boolean(await prisma.game.findUnique({ where: { code } }));
  }

  private debugLog() {
    const games = Object.entries(this._games).reduce((carry, [code, clients]) => {
      return { ...carry, [code]: clients?.length ?? 0 };
    }, {});
    console.table(games);
  }
}

export const GameNamespace = new GameNamespaceService();
