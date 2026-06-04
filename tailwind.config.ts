import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette inspired by the Nexa Digital logo
        nexa: {
          950: "#03040f",
          900: "#050816",
          800: "#0a0e27",
          700: "#0f1635",
          600: "#152043",
        },
        brand: {
          DEFAULT: "#2e9bff",
          50: "#eaf4ff",
          100: "#d4e9ff",
          200: "#a9d2ff",
          300: "#7ebcff",
          400: "#53a5ff",
          500: "#2e9bff",
          600: "#1e7fe0",
          700: "#1763ad",
          800: "#11497f",
          900: "#0d3a66",
        },
        cyan: {
          DEFAULT: "#38bdf8",
        },
        silver: {
          DEFAULT: "#cdd6e3",
          light: "#eef2f8",
        },
      },
      fontFamily: {
        // Latin glyphs render in Outfit/Sora; Arabic falls back to Cairo per-glyph.
        sans: ["var(--font-outfit)", "var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-cairo)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2e9bff 0%, #38bdf8 100%)",
        "silver-gradient": "linear-gradient(135deg, #eef2f8 0%, #9fb0c6 100%)",
        "hero-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(46,155,255,0.18) 0%, rgba(5,8,22,0) 70%)",
        "grid-pattern":
          "linear-gradient(rgba(46,155,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(46,155,255,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(46,155,255,0.45)",
        "glow-lg": "0 0 80px -20px rgba(46,155,255,0.5)",
        card: "0 10px 40px -15px rgba(0,0,0,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
