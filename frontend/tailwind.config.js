/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7DD3FC', // Bleu clair des boutons
        dark: '#2C3E50',    // Couleur sombre du header
      }
    },
  },
  plugins: [],
}