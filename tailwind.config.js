/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './snippets/**/*.liquid',
    './sections/**/*.liquid',
    './templates/**/*.liquid',
    './assets/**/*.js',
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Dawn
  },
}

