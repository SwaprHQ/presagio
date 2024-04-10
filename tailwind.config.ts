import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("swapr-ui/tailwind-preset")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/swapr-ui/**/*.{js,ts,js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
