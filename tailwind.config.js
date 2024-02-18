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
      }
    }
  },
  plugins: []
}
