import fetchtest from "fetchtest";
import { User } from "@prisma/client";
import app from "../app";
import { createToken } from "../services/json-service";

type FetchTest = ReturnType<typeof fetchtest>;

export class TestCase {
  headers: Record<string, any> = {};

  static make() {
    return new TestCase();
  }

  actingAs(user: User) {
    this.headers.Authorization = `Bearer ${createToken(user)}`;
    return this;
  }

  async get(...[url, body, options = {}]: Parameters<FetchTest["get"]>) {
    const headers = this.headers;

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).get(url, body, options);
  }

  async post(...[url, body, options = {}]: Parameters<FetchTest["post"]>) {
    const headers = this.headers;

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).post(url, body, options);
  }

  async put(...[url, body, options = {}]: Parameters<FetchTest["put"]>) {
    const headers = this.headers;

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).put(url, body, options);
  }

  async patch(...[url, body, options = {}]: Parameters<FetchTest["patch"]>) {
    const headers = this.headers;

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).patch(url, body, options);
  }

  async delete(...[url, body, options = {}]: Parameters<FetchTest["delete"]>) {
    const headers = this.headers;

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).delete(url, body, options);
  }
}
