import { TestCase } from "../testing/Testcase";
import { google } from "googleapis";

const Oauth2Mock = google.auth.OAuth2 as jest.MockedClass<typeof google.auth.OAuth2>;
const PeopleMock = google.people as jest.MockedFunction<typeof google.people>;

Oauth2Mock.mockReturnValue({
  getToken: () => "",
  setCredentials: jest.fn(),
  getAccessToken: () => ({ token: "" }),
} as any);

function mockPeopleResponse(email: string) {
  PeopleMock.mockReturnValueOnce({
    people: {
      get: () => ({
        data: {
          emailAddresses: [{ value: email }],
        },
      }),
    },
  } as any);
}

process.env.CLIENT_URL = "/redirect";

describe("AuthCallback", () => {
  const testcase = TestCase.make();

  it("create a new user and return a token", async () => {
    const email = "steve@example.com";
    mockPeopleResponse(email);
    const code = "sample-code";

    const response = await testcase.get(`/auth_callback?code=${code}`);
    // TODO: Assert cookie
    expect(response.redirected).toBeTruthy();
  });
});
