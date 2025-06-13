import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...(sharedConfig.theme?.extend ?? {}),
    },
  },
};

export default config;
