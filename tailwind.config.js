/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
};
