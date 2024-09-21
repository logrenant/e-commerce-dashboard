/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
  	extend: {
  	}
  },
  plugins: [require("tailwindcss-animate")],
}