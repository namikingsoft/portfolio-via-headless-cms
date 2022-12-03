const colors = require('tailwindcss/colors')

const colorAccent = colors.teal
const colorBase = colors.stone

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx', './lib/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'base-50': colorBase[50],
        'accent-500': colorAccent[500],
        'accent-700': colorAccent[700],
        'accent-900': colorAccent[900],
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      dropShadow: {
        'white-sm': '0 0 2px rgba(255, 255, 255, 1)',
      },
      scale: {
        175: '1.75',
        200: '2.00',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
