/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@server/(.*)$": "<rootDir>/src/$1", // match your tsconfig paths
  },
  setupFilesAfterEnv: [], // only needed if you want global setup
};
