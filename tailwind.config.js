/** @type {import('tailwindcss').Config} */
module.exports = {
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
  