/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'rebot': ['Roboto', 'sans-serif'],
      "Pop": ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
