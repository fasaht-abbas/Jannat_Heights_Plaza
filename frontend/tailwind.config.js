/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: "340px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
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
