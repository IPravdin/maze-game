/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  plugins: [require("daisyui")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
            primary: "#f4b41b",
            secondary: "#472d3c",
        }
      }
    ],
  },
  theme: {
    extend: {
      fontFamily:{
        'title': ['Rubik Maze', ...defaultTheme.fontFamily.sans],
        'sans': ['Oswald', ...defaultTheme.fontFamily.sans],
      }
    },
  }
}

