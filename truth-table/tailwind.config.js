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
        'feminine-pink': '#ffb6c1',
        'feminine-lavender': '#d8bfd8',
        'feminine-rose': '#f9c6d0',
        'feminine-dark': '#1e1e2f',
        'feminine-accent': '#ff69b4',
      },
    },
  },
  plugins: [],
}
