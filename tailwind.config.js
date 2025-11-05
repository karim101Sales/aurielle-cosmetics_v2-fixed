
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./templates/**/*.html", "./public/src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f14",
        pearl: "#f6f5f3",
        champagne: "#f0e8df",
        sable: "#2b2a33",
        accent: "#c8a27a",
        gold: "#d8b98a"
      },
      fontFamily: {
        sans: ["Noto Sans", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
        arabic: ["Noto Naskh Arabic", "Noto Sans Arabic", "system-ui"]
      },
      boxShadow: {
        luxe: "0 10px 30px rgba(0,0,0,0.15)",
        glow: "0 0 40px rgba(216,185,138,0.25)"
      },
      backgroundImage: {
        'luxe-gradient': "linear-gradient(135deg, rgba(17,17,23,1) 0%, rgba(43,42,51,1) 55%, rgba(216,185,138,0.18) 100%)",
        'shine': "linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.0) 40%)"
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.2,.8,.2,1)'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
