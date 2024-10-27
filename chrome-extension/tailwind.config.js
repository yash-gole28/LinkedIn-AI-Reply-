/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-border': 'inset 0 0 0 1px rgb(192, 191, 191) !important',
        
      },
      colors: {
        'custom-gray': '#DFE1E7',
        'custom-blue': '#DBEAFE',
      },
    },
  },
  plugins: [],
}

