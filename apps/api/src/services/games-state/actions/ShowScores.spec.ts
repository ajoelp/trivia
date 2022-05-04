import { ShowScores } from "./ShowScores";
import { GameFactory } from "@src/testing/factories/GameFactory";
import { UserFactory } from "@src/testing/factories/UserFactory";
import { SHOW_SCORES } from "@trivia/shared/events";
import { prisma } from "@prisma-client";
import { GameStates } from "@trivia/shared/types";

describe("ShowScores", () => {
  it("will show scores", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const instance = new ShowScores(game.code);
    await instance.process({ type: SHOW_SCORES });

    expect((await prisma.game.findUnique({ where: { id: game.id } })).state).toMatchObject({
      state: GameStates.SHOWING_SCORES,
    });
  });
});
