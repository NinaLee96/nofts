module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  rules: {
    "no-unused-vars": 2,
    "no-undef": 2,
    "node/no-unpublished-import": [
      "error",
      {
        allowModules: ["ethers"],
      },
    ],
    "react/prop-types": [1, {}],
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      files: ["hardhat.config.js"],
      globals: { task: true },
    },
  ],
};
