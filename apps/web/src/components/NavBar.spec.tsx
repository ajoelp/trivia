import { render, screen } from "@testing-library/react";
import { flushPromises, testingWrapper } from "../testing/helpers";
import { NavBar } from "./NavBar";
import { User } from "@trivia/shared/types";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";
import { routePath } from "../router/router";
import Cookies from "js-cookie";

describe("NavBar", () => {
  it("wil render the component", async () => {
    render(<NavBar />, { wrapper: testingWrapper() });
  });

  it("will show the current users email address", async () => {
    const user: User = { email: "test@email.com", id: "random-id" };
    render(<NavBar />, { wrapper: testingWrapper(user) });
    expect(await screen.findByAltText(user.email)).toBeInTheDocument();
  });

  it("will logout a user", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.MockedFunction<typeof useNavigate>).mockImplementationOnce(() => navigate);

    const removeSpy = jest.spyOn(Cookies, "remove").mockImplementation();

    const user: User = { email: "test@email.com", id: "random-id" };
    render(<NavBar />, { wrapper: testingWrapper(user) });

    const button = await screen.findByAltText(user.email);
    expect(await screen.findByAltText(user.email)).toBeInTheDocument();
    await userEvent.click(button);
    const logout = await screen.findByText("Logout");
    await userEvent.click(logout);
    await flushPromises();

    expect(navigate).toHaveBeenCalledWith(routePath(RouteNames.ROOT));
    expect(removeSpy).toHaveBeenCalledWith("AUTH_TOKEN");
  });
});
