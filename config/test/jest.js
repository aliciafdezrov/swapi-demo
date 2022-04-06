module.exports = {
    rootDir: '../../',
    preset: 'ts-jest',
    restoreMocks: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
    moduleNameMapper: {
        "^common/(.*)$": "<rootDir>/src/common/$1",
        "^core/(.*)$": "<rootDir>/src/core/$1",
        "^layouts/(.*)$": "<rootDir>/src/layouts/$1",
        "^pods/(.*)$": "<rootDir>/src/pods/$1",
        "^scenes/(.*)$": "<rootDir>/src/scenes/$1",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|webp)$": "jest-transform-stub"
    },
    testPathIgnorePatterns: [
        "<rootDir>/cypress/"
    ],
};
