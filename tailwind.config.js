/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui:{
    themes:["light", "dark", "dracula"],
    darkTheme: "dark"
  },
  theme: {
    extend: {
      colors:{
        'drac-comment': '#627a4',
      },
      
    },
  },
  plugins: [require("daisyui"), require('tailwindcss-animatecss'), require('tailwind-scrollbar'),],
  
}