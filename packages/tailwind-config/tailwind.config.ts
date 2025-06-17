import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
  content: [
    // App-level folders
    "../../apps/web/**/*.{js,ts,jsx,tsx,mdx}",
    // Shared packages (like UI components)
    path.join(__dirname, "../../packages/ui/src") + "/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
