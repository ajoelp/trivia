import { render, screen, waitFor } from "@testing-library/react";
import ManageGame from "./manage-game";
import userEvent from "@testing-library/user-event";
import { mockedFunction, mockServices, testingWrapper } from "../../testing/helpers";
import { Services } from "../../api/services";
import { toast } from "../../services/toast";
import { GameFactory } from "../../testing/factories/GameFactory";
import { useParams } from "react-router-dom";

function renderComponent() {
  render(<ManageGame />, { wrapper: testingWrapper() });
}

describe("Add Game", () => {
  it("will add a new game", async () => {
    mockServices.games.create.mockResolvedValue(GameFactory.build());

    const createGameSpy = jest.spyOn(Services.games, "create");
    const successSpy = jest.spyOn(toast, "success");

    renderComponent();

    const activeInput = await screen.findByTestId("active-input");
    await userEvent.click(activeInput);

    const nameInput = await screen.findByTestId("name-input");
    await userEvent.type(nameInput, "random-name");

    const submitButton = await screen.findByTestId("submit-button");
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(createGameSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "random-name",
          active: true,
        }),
      ),
    );

    expect(successSpy).toHaveBeenCalled();
  });
  it("will show form errors", async () => {
    const messages = {
      name: "This field is required",
      active: "This field must be a boolean",
    };

    mockServices.games.create.mockRejectedValue({
      response: {
        data: {
          error: "",
          messages,
        },
      },
    });

    const createGameSpy = jest.spyOn(Services.games, "create");
    const errorSpy = jest.spyOn(toast, "error");

    renderComponent();

    const submitButton = await screen.findByTestId("submit-button");
    await userEvent.click(submitButton);

    await waitFor(() => expect(createGameSpy).toHaveBeenCalled());
    expect(errorSpy).toHaveBeenCalled();

    expect(await screen.findByText(messages.name)).toBeInTheDocument();
    expect(await screen.findByText(messages.active)).toBeInTheDocument();
  });
});

const mockUseParams = mockedFunction(useParams);

describe("Edit Game", () => {
  const id = "test-id-123";

  it("will edit a game", async () => {
    mockUseParams.mockReturnValue({ id });

    mockServices.games.update.mockResolvedValue(GameFactory.build());

    const updateGameSpy = jest.spyOn(Services.games, "update");
    const successSpy = jest.spyOn(toast, "success");

    renderComponent();

    const activeInput = await screen.findByTestId("active-input");
    await userEvent.click(activeInput);

    const nameInput = await screen.findByTestId("name-input");
    await userEvent.type(nameInput, "random-name");

    const submitButton = await screen.findByTestId("submit-button");
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(updateGameSpy).toHaveBeenCalledWith(
        id,
        expect.objectContaining({
          name: "random-name",
          active: true,
        }),
      ),
    );

    expect(successSpy).toHaveBeenCalled();
  });
  it("will show form errors", async () => {
    mockUseParams.mockReturnValue({ id });

    const messages = {
      name: "This field is required",
      active: "This field must be a boolean",
    };

    mockServices.games.update.mockRejectedValue({
      response: {
        data: {
          error: "",
          messages,
        },
      },
    });

    const updateGameSpy = jest.spyOn(Services.games, "update");
    const errorSpy = jest.spyOn(toast, "error");

    renderComponent();

    const submitButton = await screen.findByTestId("submit-button");
    await userEvent.click(submitButton);

    await waitFor(() => expect(updateGameSpy).toHaveBeenCalled());
    expect(errorSpy).toHaveBeenCalled();

    expect(await screen.findByText(messages.name)).toBeInTheDocument();
    expect(await screen.findByText(messages.active)).toBeInTheDocument();
  });
});
