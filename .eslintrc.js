module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "react/prop-types": "off",
    "react/no-unescaped-entities": [
      2,
      {
        forbid: [">", "}"],
      },
    ],
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
}
