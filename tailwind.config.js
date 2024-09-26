/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secoundary: "#ac73c1",
        accent: "#fdebad",
        accent_bg: "#f0def4",
        neutral: "#000",
        
        warning: "#f4b400",
        success: "#31ab70",
        error: "#ef4444",

        dark_primary: "#003c44",
        dark_secoundary: "#135d66",
        dark_accent: "#77b0aa",
        dark_accent_bg: "#e3fef7",
        dark_neutral: "#fff",
      },
    },
  },
  daisyui: {
    themes: ["lofi"],
  },
  plugins: [require("daisyui")],
};
