import { render, screen } from "@testing-library/react";
import { GamesTable } from "./GamesTable";
import { AppWrapper, flushPromises } from "../testing/helpers";
import { mswServer } from "../mocks/server";
import { rest } from "msw";
import { respondWithData } from "../mocks/helpers";
import { Game } from "../types/models";
import { GameFactory } from "../testing/factories/GameFactory";

const renderComponent = () => {
  return render(<GamesTable />, { wrapper: AppWrapper });
};

describe("GamesTable", () => {
  it("will render the games table", async () => {
    renderComponent();
    await flushPromises();
    expect(await screen.findByText("No Results")).toBeInTheDocument();
  });

  it("will render the table with games", async () => {
    const games: Game[] = GameFactory.buildMany(10);
    mswServer.use(rest.get("/games", respondWithData(games, 200, true)));

    renderComponent();
    await flushPromises();

    for (let game of games) {
      expect(await screen.findByText(game.name)).toBeInTheDocument();
      expect(await screen.findByText(game.code)).toBeInTheDocument();
    }
  });
});
