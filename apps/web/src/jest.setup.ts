import "@testing-library/jest-dom";
import { testingClient } from "./testing/helpers";
import { setLogger } from "react-query";

const crypto = require("crypto");

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});

class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

afterEach(() => {
  testingClient.clear();
});
