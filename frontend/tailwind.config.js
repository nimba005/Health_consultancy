/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'light-gray': '#F7F7F7',
      'green': '#00BA4E',
      'blue': '#5C7EFD',
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
}
