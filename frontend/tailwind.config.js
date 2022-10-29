/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Anton", "sans-serif"],
      anton: ["anton", "sans-serif"],
      sans: ["Alterwave", "sans-serif"],
      prompt: ["Prompt", "sans-serif"],
      lighters: ["Lighters", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      thin: ["Alterwave", "sans-serif"],
      fire: ["FiraSans", "sans-serif"]
    },
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    colors:{
      'background': '#111111',
      'grey': '#292929',
      'white': '#ffffff',
      'tahiti': '#3ab7bf',
    },
    fontSize: {
      'sm': '0.8rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '3rem',
      '4xl': '6rem',
    }
  },
  plugins: [],
}
