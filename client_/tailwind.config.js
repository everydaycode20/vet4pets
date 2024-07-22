/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "10px",
        lg: "24px",
      },
    },
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
    extend: {
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
