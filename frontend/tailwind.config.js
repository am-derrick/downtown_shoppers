/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          'brand-yellow': '#fed700',
          'brand-green': '#32cd33',
        }
      }
    },
  },
  plugins: [],
}

