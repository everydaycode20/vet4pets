/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "375px",
      sm: "480px",
      sm2: "680px",
      md: "768px",
      lg: "976px",
      lg2: "1280px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "10px",
        lg: "24px",
      },
    },
    extend: {
      colors: {
        blue: "#4D7CFE",
        "light-blue": "#4D7CFE26",
        cyan: "#2CE5F6",
        "light-cyan": "#2CE5F626",
        pink: "#FE4D97",
        "light-pink": "#FE4D9726",
        orange: "#FFAB2B",
        "light-orange": "#FFAB2B26",
        green: "#6DD230",
        "light-green": "#6DD23026",
        "gray-dark": "#273444",
        gray: "#98A9BC",
        "light-gray": "#E8ECEF",
        "light-gray-2": "#F2F4F6",
        "light-gray-3": "#F8FAFB",
        "light-gray-4": "#778CA2",
        black: "#252631",
        "light-black": "#25263126",
        white: "#fff",
        dark: "#0D1117",
        "dark-2": "#11161C",
        "dark-3": "#161B22",
        "dark-4": "#2D333B",
        "dark-5": "#1f242c",
        "dark-text": "#E6EDF3",
        "dark-text-2": "#8B949E",
        "dark-text-disabled": "#6E7681",
        "dark-accent-blue": "#4D7CFE",
        "dark-accent-green": "#07DB1A",
        "dark-accent-red": "#DB074F",
        "dark-accent-yellow": "#DB9F07",
      },
      borderRadius: {
        5: "5px",
        10: "10px",
        20: "20px",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },

      fontFamily: {
        publicSans: ["Public Sans", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};
