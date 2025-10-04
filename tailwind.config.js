/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
    content: [
      "./Pages/**/*.{cshtml,razor,html}",
      "./Views/**/*.{cshtml,razor,html}",
      "./wwwroot/**/*.html",
      "./**/*.cshtml",
      "./src/**/*.{html,ts}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  