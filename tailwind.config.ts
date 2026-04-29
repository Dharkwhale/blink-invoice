import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch's Professional Palette
        primary: "#9945FF",    // Solana Purple
        secondary: "#14F195",  // Electric Green
        background: "#0F0F12", // Deep Neutral
        surface: "#1A1A1E",    // Card Backgrounds
        muted: "#94A3B8",      // Accessible Gray
      },
      fontFamily: {
        // Linking the Geist variables from your layout.tsx
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};

export default config;