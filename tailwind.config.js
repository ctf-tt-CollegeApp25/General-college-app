/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{jsx, js, tsx, ts}", "./components/**/*.{jsx, js, tsx, ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary : '#4ade80',
        secondary : '#9ca3af',
        tertiary : '#ffffff',
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

//#A7E0FC blue -1
//#bae6fd blue 2
//#38bdf8 blue 3


//#9ca3af grey -400