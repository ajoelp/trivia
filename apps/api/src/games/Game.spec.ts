import { TestCase } from "../testing/Testcase";
import { GameFactory } from "../testing/factories/GameFactory";
import { UserFactory } from "../testing/factories/UserFactory";
import { Game } from "@prisma/client";
import { prisma } from "../../prisma";

const testcase = TestCase.make();

describe("Game", () => {
  it("can get games", async () => {
    const user = await UserFactory.create();
    await GameFactory.createMany(2, { author: { connect: { id: user.id } } });
    const response = await testcase.get("/games");
    expect(response.status).toEqual(200);
    expect(response.json).toHaveLength(2);
  });

  it("can get a specified game", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ author: { connect: { id: user.id } } });
    const response = await testcase.get(`/games/${game.id}`);

    expect(response.status).toEqual(200);
    expect(response.json).toEqual(expect.objectContaining({ id: game.id }));
  });

  it("can create a game", async () => {
    const user = await UserFactory.create();
    const expectedName = "Test Game";

    const data = {
      name: expectedName,
    };

    const response = await testcase.actingAs(user).post("/games", data);

    expect(response.status).toEqual(201);
    expect(response.json).toEqual(expect.objectContaining({ name: expectedName }));

    expect(
      await prisma.game.findFirst({
        where: {
          name: expectedName,
        },
      }),
    ).toBeTruthy();
  });
});
