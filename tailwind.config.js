const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx', './lib/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'accent-500': colors.teal[500],
        'accent-700': colors.teal[700],
        'accent-900': colors.teal[900],
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
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
