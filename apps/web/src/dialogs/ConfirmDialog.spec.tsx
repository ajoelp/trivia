import { render, screen } from "@testing-library/react";
import ConfirmDialog, { ConfirmDialogProps } from "./ConfirmDialog";
import { DialogProps } from "dialog-manager-react";
import userEvent from "@testing-library/user-event";

const closeDialog = jest.fn();
const renderComponent = (props: Omit<ConfirmDialogProps, keyof DialogProps>) => {
  render(<ConfirmDialog {...props} closeDialog={closeDialog} active={true} />);
};

describe("ConfirmDialog", () => {
  it("will render the component", async () => {
    const props = {
      message: "this is the message",
      onSuccess: jest.fn(),
      title: "this is the title",
    };
    renderComponent(props);
    expect(await screen.findByText(props.message)).toBeInTheDocument();
    expect(await screen.findByText(props.title)).toBeInTheDocument();
  });

  it("will call the on submit when button is clicked", async () => {
    const props = {
      message: "this is the message",
      onSuccess: jest.fn(),
      title: "this is the title",
    };
    renderComponent(props);
    const confirmButton = await screen.findByText("Confirm");
    expect(confirmButton).toBeInTheDocument();
    await userEvent.click(confirmButton);
    expect(props.onSuccess).toHaveBeenCalled();
  });

  it("will call closeDialog when cancel is clicked", async () => {
    const props = {
      message: "this is the message",
      onSuccess: jest.fn(),
      title: "this is the title",
    };
    renderComponent(props);
    const cancelButton = await screen.findByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(cancelButton);
    expect(closeDialog).toHaveBeenCalled();
  });
});
