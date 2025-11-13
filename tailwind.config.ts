import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayurveda: {
          sage: '#8B9D83',
          earth: '#A67C52',
          sand: '#D4C5B0',
          olive: '#6B7456',
          cream: '#F5F1E8',
          terracotta: '#C96D4A',
        }
      },
    },
  },
  plugins: [],
};
export default config;
