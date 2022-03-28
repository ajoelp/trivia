import { render, screen } from "@testing-library/react";
import { Portal, PORTAL_PREFIX, PortalProvider, PortalTarget } from "./Portal";
import { flushPromises } from "../testing/helpers";

describe("Portal", () => {
  it("will render the portal target", async () => {
    const name = "test-portal";
    render(<PortalTarget name={name} />, { wrapper: PortalProvider });
    expect(await screen.findByTestId(`${PORTAL_PREFIX}-${name}`)).toBeInTheDocument();
  });

  it("will render the data in the portal", async () => {
    const name = "test-portal";
    const ChildElement = jest.fn().mockImplementation(() => <div data-testid="child-element" />);
    render(
      <>
        <PortalTarget name={name} />
        <Portal name={name}>
          <ChildElement />
        </Portal>
      </>,
      { container: document.body, wrapper: PortalProvider },
    );

    const target = await screen.findByTestId(`${PORTAL_PREFIX}-${name}`);
    expect(ChildElement).toHaveBeenCalled();
    await flushPromises();
    const child = await screen.findByTestId("child-element");
    expect(target).toContainElement(child);
  });
});
