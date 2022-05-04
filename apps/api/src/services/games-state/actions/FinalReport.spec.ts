import { FinalReport } from "./FinalReport";
import { GameFactory } from "@src/testing/factories/GameFactory";
import { UserFactory } from "@src/testing/factories/UserFactory";
import { FINAL_REPORT } from "@trivia/shared/events";
import { prisma } from "@prisma-client";
import { GameStates } from "@trivia/shared/types";

describe("FinalReport", () => {
  it("will show scores", async () => {
    const user = await UserFactory.create();
    const game = await GameFactory.create({
      author: { connect: { id: user.id } },
    });

    const instance = new FinalReport(game.code);
    await instance.process({ type: FINAL_REPORT });

    expect((await prisma.game.findUnique({ where: { id: game.id } })).state).toMatchObject({
      state: GameStates.COMPLETE,
    });
  });
});
