export const JWT_SECRET = "mysecret";
export const PORT = 8088;
export const HOST = "0.0.0.0";
export const API_URL = `http://localhost:8088`;

export const OAUTH_CREDENTIALS = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  project_id: "ajoelp-trivia", // The name of your project
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uris: [`${API_URL}/auth_callback`],
  scopes: [
    "https://www.googleapis.com/auth/plus.me",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
};
