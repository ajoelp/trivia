import { TestCase } from "../testing/Testcase";
import { GameFactory } from "../testing/factories/GameFactory";
import { UserFactory } from "../testing/factories/UserFactory";
import { prisma } from "../../prisma";

const testcase = TestCase.make();

describe("GameController", () => {
  it("can get games", async () => {
    const user = await UserFactory.create();
    await GameFactory.createMany(2, { author: { connect: { id: user.id } } });

    const response = await testcase.actingAs(user).get("/games");

    expect(response.status).toEqual(200);
    expect(response.json).toHaveLength(2);
  });

  it("can get a specified game", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });
    const response = await testcase.actingAs(user).get(`/games/${game.id}`);

    expect(response.status).toEqual(200);
    expect(response.json).toEqual(expect.objectContaining({ id: game.id }));
  });

  describe("create", () => {
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

    it("will throw validation errors", async () => {
      const user = await UserFactory.create();
      const data = {};
      const response = await testcase.actingAs(user).post("/games", data);

      expect(response.status).toEqual(400);
    });
  });

  it("can update a game", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const expectedName = "Test Game";

    const data = {
      name: expectedName,
    };

    const response = await testcase.actingAs(user).patch(`/games/${game.id}`, data);

    expect(response.status).toEqual(200);
    expect(response.json).toEqual(expect.objectContaining({ name: expectedName }));

    expect(
      await prisma.game.findFirst({
        where: {
          id: game.id,
          name: expectedName,
        },
      }),
    ).toBeTruthy();
  });

  it("generates a unique code for each game", async () => {
    const user = await UserFactory.create();
    const data = {
      name: "Test Game",
    };
    await testcase.actingAs(user).post("/games", data);

    const response = await testcase.actingAs(user).post("/games", {
      name: "Test Game 2",
    });
    expect(response.status).toEqual(201);
  });
});
