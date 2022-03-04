import { render } from "@testing-library/react";
import App from "./app";

describe("app", () => {
  it("will render", async () => {
    render(<App />);
  });
});
