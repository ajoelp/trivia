import { render, screen } from "@testing-library/react";
import { AppWrapper, flushPromises } from "../testing/helpers";
import { NavBar } from "./NavBar";
import { User } from "../types/models";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";
import { routePath } from "../router/router";
import Cookies from "js-cookie";

describe("NavBar", () => {
  it("wil render the component", async () => {
    render(
      <AppWrapper>
        <NavBar />
      </AppWrapper>,
    );
    expect(await screen.findByText("trivi")).toBeInTheDocument();
  });

  it("will show the current users email address", async () => {
    const user: User = { email: "test@email.com", id: "random-id" };
    render(
      <AppWrapper user={user}>
        <NavBar />
      </AppWrapper>,
    );
    expect(await screen.findByAltText(user.email)).toBeInTheDocument();
  });

  it("will logout a user", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.MockedFunction<typeof useNavigate>).mockImplementationOnce(() => navigate);

    const removeSpy = jest.spyOn(Cookies, "remove").mockImplementation();

    const user: User = { email: "test@email.com", id: "random-id" };
    render(
      <AppWrapper user={user}>
        <NavBar />
      </AppWrapper>,
    );

    const button = await screen.findByAltText(user.email);
    expect(await screen.findByAltText(user.email)).toBeInTheDocument();
    userEvent.click(button);
    const logout = await screen.findByText("Logout");
    userEvent.click(logout);
    await flushPromises();

    expect(navigate).toHaveBeenCalledWith(routePath(RouteNames.ROOT));
    expect(removeSpy).toHaveBeenCalledWith("AUTH_TOKEN");
  });
});
