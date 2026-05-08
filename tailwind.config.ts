import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#E85D75",
          light: "#FDEEF1",
          dark: "#C44560",
        },
        warm: {
          DEFAULT: "#F7F3F0",
          dark: "#EDE6DF",
        },
        green: {
          DEFAULT: "#6FCF97",
          light: "#E8F8EF",
          dark: "#45A36D",
        },
        brand: {
          text: "#1F1F1F",
          "text-sec": "#6B6B6B",
          "text-tert": "#9E9E9E",
          border: "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        heartbeat: {
          "0%":   { transform: "scale(1)" },
          "14%":  { transform: "scale(1.22)" },
          "28%":  { transform: "scale(1)" },
          "42%":  { transform: "scale(1.14)" },
          "56%":  { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":       { opacity: "0.5", transform: "scale(0.7)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        heartbeat:   "heartbeat 1.4s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease infinite",
        "fade-up-1": "fade-up 0.6s ease both",
        "fade-up-2": "fade-up 0.6s 0.1s ease both",
        "fade-up-3": "fade-up 0.6s 0.2s ease both",
        "fade-up-4": "fade-up 0.6s 0.3s ease both",
        "fade-up-5": "fade-up 0.6s 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;