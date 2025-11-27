import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores([
    "*.mjs",
    "node_modules/**",
    ".next/**",
    "out/**",
    "dist/**",
    "build/**",
    "next-env.d.ts",
    "*.tsbuildinfo",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
        sourceType: "module",
      },
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
        },
      },
    },
    rules: {
      "no-console": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      "import/no-unresolved": "off",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
]);

export default eslintConfig;
