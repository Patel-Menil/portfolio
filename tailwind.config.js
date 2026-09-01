/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        border: 'rgba(255,255,255,0.1)',
        primary: '#38bdf8',
        accent: '#8b5cf6',
        text: {
          primary: '#f3f4f6',
          secondary: '#9ca3af',
        }
      },
    },
  },
  plugins: [],
}
