/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  maxWorkers: 1,
  verbose: true,
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest/legacy",
  },
};
