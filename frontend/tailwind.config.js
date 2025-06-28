/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        bgUltra: "rgba(var(--bg-ultra))",
        primary: "rgba(var(--primary))",
        primaryl: "rgba(var(--primary-light))",
        primaryd: "rgba(var(--primary-dark))",
        accent: "rgba(var(--accent))",
        textPrimary: "rgba(var(--text-color))",
        textAlt: "rgba(var(--text-color-light))",
      },
    },
  },
  plugins: [],
}