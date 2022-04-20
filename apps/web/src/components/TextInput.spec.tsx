import { screen } from "@testing-library/react";
import TextInput from "./TextInput";
import { renderController } from "../mocks/helpers";
import userEvent from "@testing-library/user-event";

describe("TextInput", () => {
  const renderComponent = (name: string, label: string) => {
    return renderController((control) => <TextInput label={label} name={name} control={control} defaultValue="" />);
  };

  it("will render", async () => {
    const label = "This is the label";
    const name = "field_name";
    const value = "new value";
    const view = renderComponent(name, label);

    userEvent.type(await screen.findByLabelText(label), value);

    expect(view()).toEqual(
      expect.objectContaining({
        [name]: value,
      }),
    );
  });
});
