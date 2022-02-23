import fetchtest from "fetchtest";
import { User } from "@prisma/client";
import app from "../app";

type FetchTest = ReturnType<typeof fetchtest>;

type HeaderPromiseClosure = () => Promise<Record<string, any>>;

export class TestCase {
  headerPromises: HeaderPromiseClosure[] = [];

  static make() {
    return new TestCase();
  }

  actingAs(user: User) {
    // TODO: Implement auth stuff
    return this;
  }

  async get(...[url, body, options = {}]: Parameters<FetchTest["get"]>) {
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).get(url, body, options);
  }

  async post(...[url, body, options = {}]: Parameters<FetchTest["post"]>) {
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).post(url, body, options);
  }

  async put(...[url, body, options = {}]: Parameters<FetchTest["put"]>) {
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).put(url, body, options);
  }

  async patch(...[url, body, options = {}]: Parameters<FetchTest["patch"]>) {
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).patch(url, body, options);
  }

  async delete(...[url, body, options = {}]: Parameters<FetchTest["delete"]>) {
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(app).delete(url, body, options);
  }

  private async buildHeaders(): Promise<Record<string, any>> {
    let headers = {};
    for (const headerClosure of this.headerPromises) {
      headers = Object.assign(headers, await headerClosure());
    }
    return headers;
  }
}
