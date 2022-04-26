import { renderController } from "../mocks/helpers";
import Toggle from "./Toggle";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

describe("Toggle", () => {
  const renderComponent = (label: string, name: string) => {
    return renderController((control) => <Toggle label={label} name={name} control={control} defaultValue={false} />);
  };

  it("will toggle", async () => {
    const name = "toggle-name";
    const label = "Toggle Label";
    const view = renderComponent(label, name);

    await userEvent.click(await screen.findByLabelText(label));

    expect(view()).toEqual(
      expect.objectContaining({
        [name]: true,
      }),
    );

    await userEvent.click(await screen.findByLabelText(label));

    expect(view()).toEqual(
      expect.objectContaining({
        [name]: false,
      }),
    );
  });
});
