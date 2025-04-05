import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import neostandard from "neostandard";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...neostandard(),
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    rules: {
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-use-before-define": [
        "error",
        {
          functions: true,
          classes: true,
          variables: false,
          allowNamedExports: false,
        },
      ],
    },
  },
];

export default eslintConfig;
