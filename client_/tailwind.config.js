/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
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
      black: "#252631",
      "light-black": "#25263126",
    },
    extend: {
      borderRadius: {
        5: "5px",
        10: "10px",
        20: "20px",
      },
    },
  },
  plugins: [],
};
