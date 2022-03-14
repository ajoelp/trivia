import { screen, render } from "@testing-library/react";
import RootPage from "./root-page";
import { Link } from "react-router-dom";
import { RouteNames } from "../router/routes";
import { routePath } from "../router/router";

describe("root-page", () => {
  const buttons: [string, RouteNames][] = [
    ["Join", RouteNames.GAME],
    ["Create", RouteNames.DASHBOARD],
    ["Watch", RouteNames.WATCH],
  ];
  it.each(buttons)("will render %s button", async (button, path) => {
    render(<RootPage />);
    expect(await screen.findByText(`${button} Game`)).toBeInTheDocument();
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        to: routePath(path),
      }),
      {},
    );
  });
});
