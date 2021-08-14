const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF4C29",
        secondary: "#334756",
        dark: "#2C394B",
        light: "#EEEEEE",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      height: {
        100: "30rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
