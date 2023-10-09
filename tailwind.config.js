/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
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
      container: {
        center: true,
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
