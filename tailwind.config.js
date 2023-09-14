/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'title': ['Rubik Maze', ...defaultTheme.fontFamily.sans],
        'sans': ['Oswald', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [require("daisyui")],
}

