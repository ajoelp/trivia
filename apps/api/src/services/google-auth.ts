import { google } from "googleapis";
import { OAUTH_CREDENTIALS } from "../config";
import { OAuth2Client } from "google-auth-library";
import {findOrCreateUser} from "./users-service";

export function createConnection(): OAuth2Client {
  return new google.auth.OAuth2(
    OAUTH_CREDENTIALS.client_id,
    OAUTH_CREDENTIALS.client_secret,
    OAUTH_CREDENTIALS.redirect_uris[0],
  );
}

export function getConnectionUrl() {
  const auth = createConnection();
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: OAUTH_CREDENTIALS.scopes,
  });
}

function getGooglePlusApi(auth: OAuth2Client) {
  return google.people("v1");
}

export async function getUserFromAccountCode(code: string) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  auth.setCredentials(data.tokens);

  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({
    resourceName: "people/me",
    access_token: (await auth.getAccessToken()).token as string,
    personFields: "emailAddresses",
  });

  const addresses = me?.data?.emailAddresses ?? [];

  if (addresses.length <= 0) {
    return null;
  }

  const email = addresses?.[0].value;

  if (!email) return null;

  return findOrCreateUser(email);
}
