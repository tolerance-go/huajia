// const { pathsToModuleNameMapper } = require("ts-jest");
// const tsconfig = require("./tsconfig.json");

// console.log("tsconfig", tsconfig);

// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  // moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
  //   prefix: "<rootDir>/",
  // }),
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
