import { GameNamespaceService } from "./GameNamespace";
import { UserFactory } from "../testing/factories/UserFactory";
import { GameFactory } from "../testing/factories/GameFactory";
import { v4 } from "uuid";

const makeSocket = (code: string) =>
  ({
    id: v4(),
    nsp: {
      name: code,
    },
    disconnect: jest.fn(),
  } as any);

describe("GameNamespaceService", () => {
  describe("getGameCode", () => {
    const variants = [
      ["123123", "/123123"],
      ["ABC123", "/ABC123"],
      ["AAAAAA", "/AAAAAA"],
      ["123123-123123", "/123123-123123"],
    ];

    it.each(variants)("will return %s when code is %s", (code, url) => {
      const socket = makeSocket(url);
      const service = new GameNamespaceService();
      expect(service.getGameCode(socket)).toEqual(code);
    });
  });

  describe("onConnection", () => {
    it("will add socket client to game list", async () => {
      const user = await UserFactory.create();
      const game = await GameFactory.create({ author: { connect: { id: user.id } } });
      const service = new GameNamespaceService();
      const socket = makeSocket(`/${game.code}`);

      await service.onConnection(socket);
      expect(service._games[game.code]).toContain(socket);
      expect(service.totalConnectedClients()).toEqual(1);
    });

    it("will not add client if code is invalid", async () => {
      const service = new GameNamespaceService();
      const socket = makeSocket("bad-code");

      await service.onConnection(socket);
      expect(socket.disconnect).toHaveBeenCalled();
      expect(service.totalConnectedClients()).toEqual(0);
    });

    it("will not allow connecting to a game code that does not exist", async () => {
      const service = new GameNamespaceService();
      const code = "randomcode";
      const socket = makeSocket(`/${code}`);

      await service.onConnection(socket);
      expect(socket.disconnect).toHaveBeenCalled();
      expect(service.totalConnectedClients()).toEqual(0);
    });
  });

  describe("onDisconnect", () => {
    it("will remove a socket on disconnect", () => {
      const service = new GameNamespaceService();
      const code = "randomcode";
      const socket = makeSocket(`/${code}`);

      service._games[code] = [socket];

      service.onDisconnect(socket);
      expect(service._games[code]).toHaveLength(0);
    });

    it("will remove specific socket", () => {
      const service = new GameNamespaceService();
      const code = "valid-code";
      const [socket1, socket2, socket3] = Array.from({ length: 3 }).map(() => makeSocket(`/${code}`));
      service._games[code] = [socket1, socket2, socket3];

      service.onDisconnect(socket2);
      expect(service._games[code]).toHaveLength(2);
      expect(service._games[code]).toEqual([socket1, socket3]);

      service.onDisconnect(socket3);
      expect(service._games[code]).toHaveLength(1);
      expect(service._games[code]).toEqual([socket1]);

      service.onDisconnect(socket1);
      expect(service._games[code]).toHaveLength(0);
    });
  });
});
