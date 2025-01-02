/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{jsx, js, tsx, ts}", "./components/**/*.{jsx, js, tsx, ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary : '#5700ff',
        secondary : '#4d4d4d',
        tertiary : '#eeebe5',
        quaternary : '#1a1a1a',
      },
      fontFamily:{
        pregular : ["Poppins-Regular","sans-serif"],
        pbold : ["Poppins-Bold","sans-serif"],
        psemibold : ["Poppins-SemiBold","sans-serif"],
        pmedium : ["Poppins-Medium","sans-serif"],
      }
    },
  },
  plugins: [],
  
}

