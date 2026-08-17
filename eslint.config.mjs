import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["messages/**/*.json"],
  },
  ...nextCoreWebVitals,
  {
    files: ["**/*.test.tsx", "**/*.test.ts"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
