import Index, { DropdownOption } from "./Dropdown";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Dropdown", () => {
  it("will render the component with buttons", async () => {
    const test = "Hello world";

    const option: DropdownOption = {
      type: "button",
      onClick: jest.fn(),
      label: "Test Option",
    };

    render(<Index options={[option]}>{test}</Index>);

    const trigger = await screen.findByText(test);
    fireEvent.click(trigger);
    const optionButton = await screen.findByText(option.label);
    fireEvent.click(optionButton);
    expect(option.onClick).toHaveBeenCalledTimes(1);
  });

  it("will render the component with a link", async () => {
    const test = "Hello world";

    const option: DropdownOption = {
      label: "option",
      type: "link",
      href: "/test-link",
      target: "_blank",
    };

    render(<Index options={[option]}>{test}</Index>);

    const trigger = await screen.findByText(test);
    fireEvent.click(trigger);
    const optionButton: HTMLAnchorElement = await screen.findByText(option.label);

    expect(optionButton.href).toContain(option.href);
    expect(optionButton.target).toEqual(option.target);
  });
});
