import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-console": "warn",   // السماح باستخدام console بتحذير بدلاً من خطأ
      "react/prop-types": "off",  // تعطيل التحقق من PropTypes
      "@typescript-eslint/no-explicit-any": "off",  // السماح باستخدام any في TypeScript
    },
  },
];

export default eslintConfig;
