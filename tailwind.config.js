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
        'drac-comment': '#6272A4',
      },
    },
    animatedSettings: {
      animatedSpeed: 1000,
      heartBeatSpeed: 500,
      hingeSpeed: 2000,
      bounceInSpeed: 750,
      bounceOutSpeed: 750,
      animationDelaySpeed: 500,
      classes: ['bounce', 'heartBeat', 'fadeIn', 'fadeOut']
    }
  },
  plugins: [require("daisyui"), require('tailwindcss-animatecss'), require('tailwind-scrollbar'),],
  
}