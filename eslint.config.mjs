// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "src/generated/prisma/**",  // add any paths you want ESLint to ignore
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
