/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#000080",
      secondary: "#000000",
      accent: "#808080",
      white: "#FFFFFF",
      danger: "#Ff0000",
      success: "#2aa856",
    },
    extend: {
      fontFamily: {
        heading: ["Merriweather", defaultTheme.fontFamily.serif],
        main: ["Roboto", defaultTheme.fontFamily.sans],
        accent: ["Dosis", defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
