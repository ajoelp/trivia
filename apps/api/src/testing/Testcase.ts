import fetchtest, { BodyType, RequestOptions, RequestResponse } from "fetchtest";
import { User } from "@prisma/client";
import app from "../app";
import { createToken } from "../services/json-service";

type FetchTest = ReturnType<typeof fetchtest>;

type Methods = "get" | "post" | "put" | "patch" | "delete";

export class TestCase {
  headers: Record<string, any> = {};

  static make() {
    return new TestCase();
  }

  actingAs(user: User) {
    this.headers.Authorization = `Bearer ${createToken(user)}`;
    return this;
  }

  async get(...params: Parameters<FetchTest["get"]>) {
    return this.send("get", ...params);
  }

  async post(...params: Parameters<FetchTest["post"]>) {
    return this.send("post", ...params);
  }

  async put(...params: Parameters<FetchTest["put"]>) {
    return this.send("put", ...params);
  }

  async patch(...params: Parameters<FetchTest["patch"]>) {
    return this.send("patch", ...params);
  }

  async delete(...params: Parameters<FetchTest["delete"]>) {
    return this.send("delete", ...params);
  }

  async send(method: Methods, url: string, body?: BodyType, options: RequestOptions = {}) {
    options.headers = { ...(options?.headers ?? {}), ...this.headers };

    const result = await fetchtest(app)[method](url, body, options);

    this.processErrors(result);

    return result;
  }

  private processErrors(result: RequestResponse) {
    if (result.json?.trace) {
      console.log(result.json.trace);
    }
  }
}
