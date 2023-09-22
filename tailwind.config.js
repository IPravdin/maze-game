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
        business: {
          ...require("daisyui/src/theming/themes")["[data-theme=business]"],
            primary: "#f4b41b",
            secondary: "#472d3c",
            "--tab-radius": 0,
            "--rounded-box": 0,
            "--rounded-btn": 0,
            "--rounded-badge": 0,
            //"base-100": "#d3d1ce"
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

