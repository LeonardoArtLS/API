/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'screen-810px': '810px',
        'screen-1860px': '1860px',
      }
    },
  },
  plugins: [],
  darkMode: 'selector'
}