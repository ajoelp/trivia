import { GameEvents } from "./GameEvents";
import { Socket } from "socket.io";
import { randUuid } from "@ngneat/falso";
import { START_GAME, TriviaActions } from "@trivia/shared/events";

const makeFakeSocket = () => {
  return {
    id: randUuid(),
    emit: jest.fn(),
  } as unknown as Socket;
};

describe("GameEvents", () => {
  const GAME_CODE = "abc123";

  it("will add a client to the clients list", () => {
    const instance = new GameEvents(GAME_CODE);

    const socket = makeFakeSocket();

    instance.addClient(socket);

    expect(instance.clients).toContain(socket);
  });

  it("will remove a client from the list", () => {
    const instance = new GameEvents(GAME_CODE);

    const socket = makeFakeSocket();
    instance.addClient(socket);

    expect(instance.clients).toContain(socket);

    instance.removeClient(socket);

    expect(instance.clients).not.toContain(socket);
    expect(instance.isEmpty).toBeTruthy();
  });

  it("will emit events to multiple clients", () => {
    const clients = Array.from({ length: 10 }).map(() => makeFakeSocket());
    const instance = new GameEvents(GAME_CODE);

    instance.addClients(clients);
    instance.broadcastMessage({
      type: START_GAME,
    });

    clients.map((client) => {
      expect(client.emit).toHaveBeenCalledWith("message", { type: START_GAME });
    });
  });
});
