import { Badge, BadgeColors } from "./Badge";
import { render, screen } from "@testing-library/react";

describe("Badge", () => {
  it.each(Object.entries(BadgeColors))("will render a %s badge", async (color, classes) => {
    const text = "child-text";
    render(<Badge color={color as any}>{text}</Badge>);
    expect(await screen.findByText(text)).toBeInTheDocument();
    expect(await screen.findByText(text)).toHaveClass(...classes.split(" "));
  });
});
