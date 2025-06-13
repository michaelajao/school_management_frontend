import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Production-friendly ESLint rules
      "@typescript-eslint/no-unused-vars": process.env.NODE_ENV === 'production' ? "off" : "warn",
      "@typescript-eslint/no-explicit-any": process.env.NODE_ENV === 'production' ? "off" : "warn", 
      "react/no-unescaped-entities": process.env.NODE_ENV === 'production' ? "off" : "warn",
      "react-hooks/exhaustive-deps": process.env.NODE_ENV === 'production' ? "off" : "warn",
      "@next/next/no-img-element": process.env.NODE_ENV === 'production' ? "off" : "warn",
      "react/jsx-no-undef": "error", // Keep this as error - it's a real issue
    },
  },
];

export default eslintConfig;
