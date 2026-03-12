import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  baseDirectory: import.meta.dirname
});

const config = [
  {
    ignores: ["out/**", ".next/**", "node_modules/**"]
  },
  ...compat.extends("next/core-web-vitals")
];

export default config;
