/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  maxWorkers: 1,
  preset: "ts-jest",
  testEnvironment: path.join(__dirname, "./prisma-test-environment.ts"),
};
