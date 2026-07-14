import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, 'index.html').split(path.sep).join('/'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}').split(path.sep).join('/'),
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
