/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'spotify-black': '#121212',
        'spotify-gray': '#181818',
        'spotify-light-gray': '#b3b3b3',
        'spotify-green': '#1DB954'
      }
    }
  },
  plugins: []
}
