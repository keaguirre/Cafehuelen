/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    
    extend: {
      colors:{
       'VerdeHuelen':'#2b8565',
       'BeigeHuelen':'#f5deb3',
       'BeigeHuelen2':'#cac894',
        
      },
      
    },
  },
  plugins: [require("daisyui")],
  
}