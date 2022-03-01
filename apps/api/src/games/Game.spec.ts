import { TestCase } from "../testing/Testcase";
import { GameFactory } from "../testing/factories/GameFactory";
import {UserFactory} from "../testing/factories/UserFactory";

const testcase = TestCase.make();

describe("Game", () => {
  it("can get games", async () => {
    const user = await UserFactory.create();
    await GameFactory.createMany(2, { user: { connect: { id: user.id } } });
    const response = await testcase.get("/games");
    expect(response.status).toEqual(200);
    expect(response.json).toHaveLength(2);
  });

  it("can get a specified game", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({ user: { connect: { id: user.id } } });
    const response = await testcase.get(`/games/${game.id}`);

    expect(response.status).toEqual(200);
    expect(response.json).toEqual(game);
  });
});
