import { google } from "googleapis";
import { OAUTH_CREDENTIALS } from "../config";
import { OAuth2Client } from "google-auth-library";
import { findOrCreateUser } from "./users-service";

export class GoogleAuth {
  static make() {
    return new GoogleAuth();
  }

  createConnection(): OAuth2Client {
    return new google.auth.OAuth2(
      OAUTH_CREDENTIALS.client_id,
      OAUTH_CREDENTIALS.client_secret,
      OAUTH_CREDENTIALS.redirect_uris[0],
    );
  }
  getConnectionUrl() {
    const auth = this.createConnection();
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: OAUTH_CREDENTIALS.scopes,
    });
  }
  getGooglePlusApi() {
    return google.people("v1");
  }

  async googleEmailFromCode(code: string) {
    const auth = this.createConnection();
    const data = await auth.getToken(code);
    auth.setCredentials(data.tokens);

    const plus = this.getGooglePlusApi();
    const me = await plus.people.get({
      resourceName: "people/me",
      access_token: (await auth.getAccessToken()).token as string,
      personFields: "emailAddresses",
    });

    const addresses = me?.data?.emailAddresses ?? [];

    if (addresses.length <= 0) {
      return null;
    }

    return addresses?.[0].value;
  }

  async getUserFromAccountCode(code: string) {
    const email = await this.googleEmailFromCode(code);

    if (!email) return null;

    return findOrCreateUser(email);
  }
}
