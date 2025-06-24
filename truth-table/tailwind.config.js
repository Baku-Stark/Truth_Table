// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'feminine-pink': '#ff69b4',
        'feminine-lavender': '#E6E6FA',
        'feminine-rose': '#FF69B4',
      },
    },
  },
  plugins: [],
}