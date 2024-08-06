module.exports = {
  root: true,
  extends: [
    "airbnb-base",
    "plugin:vitest-globals/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: { browser: true, es2020: true, "vitest-globals/env": true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "18.2" },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["./"],
      },
    },
  },
  plugins: ["react-refresh", "react-hooks", "react", "sort-destructure-keys"],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "no-use-before-define": "error",
    "no-plusplus": "off",
    "no-throw-literal": "off",
    "no-await-in-loop": "off",
    "no-param-reassign": "off",
    "no-continue": "off",
    "no-shadow": "off",
    "max-len": [
      "error",
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: true,
      },
    ],
    "implicit-arrow-linebreak": "off",
    "object-curly-newline": [
      "error",
      {
        consistent: true,
        multiline: true,
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/state-in-constructor": "off",
    "react/jsx-uses-vars": 1,
    "react/sort-prop-types": [
      "error",
      {
        sortShapeProp: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/sort-default-props": "error",
    "react/require-default-props": "off",
    "react/jsx-uses-react": "error",
    "react/no-unused-prop-types": "off",
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".tsx"],
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      {
        caseSensitive: false,
      },
    ],
    "import/prefer-default-export": [
      "off",
      {
        target: "any",
      },
    ],
    "import/no-default-export": ["warn"],
    "import/extensions": [
      "error",
      "never",
      {
        json: "always",
      },
    ],
    "react/prop-types": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "./vite.config.ts",
          "./testSetup.ts",
          "**/*.test.ts",
          "**/*.test.tsx",
        ],
      },
    ],
  },
};
