/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cognition-blue': '#0066FF',
        'cognition-green': '#00D9A5',
        'cognition-dark': '#0A0A0A',
      },
    },
  },
  plugins: [],
}
