/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#EBDED1',
          brown: '#CAAA95',
          red: '#926E6F',
          purple: '#564D78',
          blue: '#9ACBD0',
        },
      },
    },
  },
  plugins: [],
}
