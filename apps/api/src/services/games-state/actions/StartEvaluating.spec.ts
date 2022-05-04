import { StartEvaluating } from "./StartEvaluating";
import { GameFactory } from "@src/testing/factories/GameFactory";
import { UserFactory } from "@src/testing/factories/UserFactory";
import { START_EVALUATING } from "@trivia/shared/events";
import { prisma } from "@prisma-client";
import { GameStates } from "@trivia/shared/types";

describe("StartEvaluating", () => {
  it("will start evaluating", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const instance = new StartEvaluating(game.code);
    await instance.process({ type: START_EVALUATING });

    expect((await prisma.game.findUnique({ where: { id: game.id } })).state).toMatchObject({
      state: GameStates.HOST_EVALUATING,
    });
  });
});
