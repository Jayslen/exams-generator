/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        $gray: '#292f36ff',
        $blue: '#4ecdc4ff',
        $red: '#ff6b6bff'
      }
    }
  },
  plugins: []
}
