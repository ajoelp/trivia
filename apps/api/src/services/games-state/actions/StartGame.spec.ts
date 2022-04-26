import { GameFactory } from "@src/testing/factories/GameFactory";
import { UserFactory } from "@src/testing/factories/UserFactory";
import { StartGame } from "@src/services/games-state/actions/StartGame";
import { prisma } from "@prisma-client";
import { GameStates } from "@trivia/shared/types";

describe("StartGame", () => {
  it("will start the game", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const instance = new StartGame(game.code);

    await instance.process();

    expect(await prisma.game.findUnique({ where: { code: game.code } })).toEqual(
      expect.objectContaining({
        state: expect.objectContaining({
          state: GameStates.STARTED,
        }),
      }),
    );
  });
});
