import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // App-level folders
    "../../apps/web/**/*.{js,ts,jsx,tsx,mdx}",
    // Shared packages (like UI components)
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
