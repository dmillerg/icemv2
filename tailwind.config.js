/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: {
            100: "#f5f5f5",
          },
          light: {
            100: "#000000",
          },
        },
        'tahiti': {
          light: '#67e8f9',
          DEFAULT: '#06b6d4',
          dark: '#0e7490',
        },
        icem: {
          100: "#6871ee",
          200: "#5e66d8",
          300: "#545cc4",
          400: "#4b52b1",
          500: "#3b408c",
          600: "#303470",
          700: "#2a2e62",
          800: "#2a2e62",
          900: "#1d2043",
        },
        current: "currentColor",
      },
    },
  },
  plugins: [],
};
