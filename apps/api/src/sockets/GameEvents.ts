import { Socket } from "socket.io";
import { TriviaActions } from "@trivia/shared/events";

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

  processAction(action: TriviaActions) {}

  broadcastMessage(action: TriviaActions) {
    this.clients.forEach((client) => {
      client.emit("message", action);
    });
  }

  get isEmpty() {
    return this.clients.length <= 0;
  }
}
