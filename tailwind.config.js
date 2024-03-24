/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Satoshi: 'Satoshi, sans-serif',
        Sans: 'General Sans, sans-serif'
      },
      colors: {
        chicago: {
          50: '#f6f5f5',
          100: '#e8e7e5',
          200: '#d3d0ce',
          300: '#b4aeac',
          400: '#8d8683',
          500: '#726b68',
          600: '#5a5552',
          700: '#524e4c',
          800: '#474543',
          900: '#3e3d3b',
          950: '#282624'
        }
      }
    }
  },
  plugins: []
}
