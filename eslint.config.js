import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts}"],
    plugins: { import: importPlugin },
    settigs: {
      "import/resolver": { typescript: true },
    },
  }
]