/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#222",
        primary: "royalblue", //"royalblue"
        info: "#7DD2EA",
        success: "#16A461",
        danger: "crimson", // "#EF837B"
        warning: "#FACC15",
        secondary: "#3a3a3b",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: ".5rem",
          md: "0",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
