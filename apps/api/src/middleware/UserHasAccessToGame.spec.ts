import { UserFactory } from "../testing/factories/UserFactory";
import { GameFactory } from "../testing/factories/GameFactory";
import { ApiRequest } from "../types/Api";
import { Response } from "express";
import UserHasAccessToGame from "./UserHasAccessToGame";
import UnauthorizedError from "../exceptions/UnauthorizedError";

describe("UserHasAccessToGame", () => {
  it("will continue if the user has access to the game", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });

    const next = jest.fn();
    const request = {
      params: { id: game.id },
      user,
    } as unknown as ApiRequest;

    const response = {} as Response;

    await UserHasAccessToGame()(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  it("will throw an UnauthorizedError if user does not have access to the game", async () => {
    const user = await UserFactory.create();
    const gameUser = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: gameUser.id } } });

    const next = jest.fn();
    const request = {
      params: { id: game.id },
      user,
    } as unknown as ApiRequest;

    const response = {} as Response;

    await expect(() => UserHasAccessToGame()(request, response, next)).rejects.toThrow(UnauthorizedError);
  });
});
