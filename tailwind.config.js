/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
     
    extend: {
      colors: {
        icem: 'rgb(59, 65, 142)',
        current: 'currentColor',
      },
    },
  },
  plugins: [
  ],
}
