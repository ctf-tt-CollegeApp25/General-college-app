/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{jsx, js, tsx, ts}", "./components/**/*.{jsx, js, tsx, ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

