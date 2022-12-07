/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "'Noto Sans', 'Noto Sans Thai', sans-serif",
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
