import { Namespace, Server, Socket } from "socket.io";

type GameClients = Record<string, Socket[]>;

class GameNamespaceService {
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

  onConnection(socket: Socket): void {
    const code = this.getGameCode(socket);
    if (!code) socket.disconnect();
    this._games[code] = [...(this._games[code] ?? []), socket];
    this.debugLog();
  }

  onDisconnect(socket: Socket): void {
    const code = this.getGameCode(socket);
    const currentIndex = this._games[code]?.findIndex((client) => client.id === socket.id);
    if (!currentIndex || currentIndex < 0) return;
    this._games[code].splice(currentIndex, 1);
    this.debugLog();
  }

  private debugLog() {
    const games = Object.entries(this._games).reduce((carry, [code, clients]) => {
      return { ...carry, [code]: clients?.length ?? 0 };
    }, {});
    console.table(games);
  }
}

export const GameNamespace = new GameNamespaceService();
