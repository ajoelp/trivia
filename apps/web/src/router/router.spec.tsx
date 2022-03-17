import { render, screen } from "@testing-library/react";
import { testingWrapper } from "../testing/helpers";
import { Route } from "./router";
import { User } from "../types/models";
import { Navigate } from "react-router-dom";

describe("router", () => {
  describe("Route component", () => {
    const Component = () => <div data-testid="app" />;

    const renderComponent = (auth: boolean = false, user?: User) => {
      render(<Route Component={Component} auth={auth} />, { wrapper: testingWrapper(user) });
    };

    it("will render the component", async () => {
      renderComponent();
      expect(await screen.findByTestId("app")).toBeInTheDocument();
    });

    it("will redirect when requires authentication", async () => {
      renderComponent(true);
      expect(screen.queryByTestId("app")).not.toBeInTheDocument();
      expect(Navigate).toHaveBeenCalledWith(
        expect.objectContaining({
          to: expect.stringContaining("/login"),
        }),
        {},
      );
    });

    it("will render the component when a user is defined", async () => {
      renderComponent(true, {
        id: "test",
        email: "email@example.com",
      });
      expect(await screen.findByTestId("app")).toBeInTheDocument();
    });
  });
});
