import type { Config } from "tailwindcss";
import sharedConfig from "@chatgpt/tailwind-config/tailwind.config";
import path from "path";

const config: Config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    // Include shared UI if needed
    path.join(__dirname, "../../packages/ui/src") + "/**/*.{ts,tsx}",
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...(sharedConfig.theme?.extend ?? {}),
      colors: {
        dark: {
          100: "#515151",
          200: "#303030",
          300: "#242424",
          400: "#212121",
          500: "#181818",
        },
      },
    },
  },
};

export default config;
