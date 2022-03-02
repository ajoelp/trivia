import { TestCase } from "../testing/Testcase";
import { google } from "googleapis";

const Oauth2Mock = google.auth.OAuth2 as jest.MockedClass<typeof google.auth.OAuth2>;

const url = "/redirect-link";

Oauth2Mock.mockReturnValue({
  generateAuthUrl: () => url,
} as any);

describe("LoginTest", () => {
  const testcase = TestCase.make();

  it("will redirect to loginUrl", async () => {
    const response = await testcase.get("/auth/login");

    expect(response.redirected).toEqual(true);
    expect(response.url).toContain(url);
  });
});
