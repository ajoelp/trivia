import { TestCase } from "./testing/Testcase";

const testcase = TestCase.make();

describe("app", () => {
  it("will start the app", async () => {
    const response = await testcase.get("/");
    expect(response.status).toEqual(200);
  });
});
