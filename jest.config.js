module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: ["js", "ts"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testMatch: [
        "**/*.spec.ts"
    ],
    testEnvironment: "node"
};