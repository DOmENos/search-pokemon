import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-slow': 'fade-in-slow 1s ease-out forwards',
        'slide-in': 'slide-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
