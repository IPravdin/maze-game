/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const businessTheme = require("daisyui/src/theming/themes")["[data-theme=business]"];

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
      fontFamily:{
        'title': ['Rubik Maze', ...defaultTheme.fontFamily.sans],
        'sans': ['Oswald', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        typing: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        'blink-caret': {
          from: { borderColor: 'transparent' },
          '50%': { borderColor: '#f4b41b' },
          to: { borderColor: 'transparent' },
        }
      },
      animation: {
        typing: 'typing 3s steps(40, end), blink-caret .75s step-end infinite',
      }
    },
  }
}

