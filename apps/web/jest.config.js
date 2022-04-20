module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
};
