import { GameState as BaseGameState, GameStates } from "@trivia/shared/types";
import { GameState } from "./GameState";

describe("GameState", () => {
  it("will set the questionId", () => {
    const instance = new GameState();

    instance.setCurrentQuestionId("current-id");
    expect(instance.currentQuestionId).toEqual("current-id");
  });

  it.each(Object.entries(GameStates))("will set the game state to %s", (_key, state) => {
    const instance = new GameState();

    instance.setGameState(state);
    expect(instance.state).toEqual(state);
  });

  it("will parse game state from json", () => {
    const state: BaseGameState = {
      state: GameStates.COMPLETE,
      teams: [{ id: "team-id", name: "team-name", members: [{ id: "member-id", name: "member-name" }] }],
      answers: [],
      currentQuestionId: "question-id",
    };

    const instance = GameState.fromJson(state);

    expect(instance.state).toEqual(GameStates.COMPLETE);
    expect(instance.currentQuestionId).toEqual(state.currentQuestionId);

    state.teams.forEach((team) => {
      expect(instance.teams.teams.get(team.id)).toBeDefined();
      expect(instance.teams.teams.get(team.id)?.members).toEqual(
        expect.arrayContaining(
          team.members.map((team) =>
            expect.objectContaining({
              name: team.name,
              id: team.id,
            }),
          ),
        ),
      );
    });
  });
});
