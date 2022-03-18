import "@testing-library/jest-dom";
import { mswServer } from "./mocks/server";
import { testingClient } from "./testing/helpers";

beforeAll(() => mswServer.listen());
afterEach(() => {
  mswServer.resetHandlers();
  testingClient.clear();
});
afterAll(() => mswServer.close());
