module.exports = {
  testURL: "http://localhost/",
  setupFiles: ["raf/polyfill", "<rootDir>/jest/browserMocks.js"],
  setupTestFrameworkScriptFile: "<rootDir>/jest/setup.js",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/fileMock.js",
    "\\.(css|less)$": "<rootDir>/jest/styleMock.js"
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  coverageThreshold: {
    global: {
      statements: 65.67,
      branches: 35.67,
      functions: 55.36,
      lines: 57.14
    }
  }
}
