/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  maxWorkers: 1,
  preset: "ts-jest",
  verbose: true,
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
};
