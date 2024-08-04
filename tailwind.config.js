/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'card-background': "url('/src/assets/card_background.png')",
      },
      colors: {
        'pokemon-blue': '#3b4cca',
        'pokemon-dark-blue': '#3c5aa6',
        'pokemon-yellow': '#ffde00',
        'pokemon-dark-yellow': '#b3a125',
        'pokemon-red': '#ff0000',
        'pokemon-dark-red': '#cc0000',
      },
      dropShadow: {
        pokemon: '2px 4px 6px black',
      },
      fontFamily: {
        PokemonSolid: ['Pokemon-Solid', 'sans-serif'],
        PokemonHollow: ['Pokemon-Hollow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
