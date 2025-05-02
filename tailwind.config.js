/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        success: '#10b981',
        danger: '#ef4444',
      },
    },
  },
  plugins: [
    require('@tailwindcss/nesting')
  ],
}
