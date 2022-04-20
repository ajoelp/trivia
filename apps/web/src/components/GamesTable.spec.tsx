import { render, screen } from "@testing-library/react";
import { GamesTable } from "./GamesTable";
import { flushPromises, mockServices, testingWrapper } from "../testing/helpers";
import { Game } from "@trivia/shared/types";
import { GameFactory } from "../testing/factories/GameFactory";

const renderComponent = () => {
  return render(<GamesTable />, { wrapper: testingWrapper() });
};

describe("GamesTable", () => {
  it("will render the games table", async () => {
    renderComponent();
    await flushPromises();
    expect(await screen.findByText("No Results")).toBeInTheDocument();
  });

  it("will render the table with games", async () => {
    const games: Game[] = GameFactory.buildMany(10);
    mockServices.games.list.mockResolvedValue(games);

    renderComponent();
    await flushPromises();

    for (let game of games) {
      expect(await screen.findByText(game.name)).toBeInTheDocument();
      expect(await screen.findByText(game.code)).toBeInTheDocument();
    }
  });
});
