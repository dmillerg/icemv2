/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
     
    extend: {
      colors: {
        'icem': {
          100: '#5963f3',
          200: '#515adc',
          300: '#454dc1',
          400: '#4b52b1',
          500: '#3b408c',
          600: '#303470',
          700: '#2a2e62',
          800: '#2a2e62',
          900: '#1d2043',
        },
        current: 'currentColor',
      },
    },
  },
  plugins: [
  ],
}
