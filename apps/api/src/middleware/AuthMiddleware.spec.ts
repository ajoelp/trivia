import { createToken } from "../services/json-service";
import { Response } from "express";
import { AuthMiddleware } from "./AuthMiddleware";
import { UserFactory } from "../testing/factories/UserFactory";
import { ApiRequest } from "../types/Api";

describe("AuthMiddleware", () => {
  it("will decode a token", async () => {
    const user = await UserFactory.create();

    const token = createToken(user);

    const request = {
      get: () => `Bearer ${token}`,
    } as unknown as ApiRequest;
    const response = {} as Response;
    const next = jest.fn();

    await AuthMiddleware(request, response, next);

    expect(next).toHaveBeenCalled();

    expect(request.user).toEqual(user);
  });
});
