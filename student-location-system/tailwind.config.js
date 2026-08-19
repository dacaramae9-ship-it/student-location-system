/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Disable base reset to avoid Bootstrap conflicts
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
