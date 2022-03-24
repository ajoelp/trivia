import { render, screen } from "@testing-library/react";
import { FormControl } from "./FormControl";

describe("FormControl", () => {
  it("will render with children", async () => {
    render(
      <FormControl>
        <div data-testid="child-element" />
      </FormControl>,
    );
    expect(await screen.findByTestId("child-element")).toBeInTheDocument();
  });

  it("will render with an error", async () => {
    const error = "error-message";
    render(
      <FormControl error={error}>
        <div data-testid="child-element" />
      </FormControl>,
    );
    expect(await screen.findByTestId("child-element")).toBeInTheDocument();
    expect(await screen.findByText(error)).toBeInTheDocument();
  });
});
