/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const businessTheme = require("daisyui/src/theming/themes")["business"];

module.exports = {
  plugins: [require("daisyui")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        business: {
          ...businessTheme,
          primary: "#f4b41b",
          secondary: "#472d3c",
          "--tab-radius": 0,
          "--rounded-box": 0,
          "--rounded-btn": 0,
          "--rounded-badge": 0,
        }
      }
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        'title': ['Rubik Maze', ...defaultTheme.fontFamily.sans],
        'sans': ['Oswald', ...defaultTheme.fontFamily.sans],
      }
    }
  }
}

