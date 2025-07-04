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
        bgDark: "rgba(var(--bg-dark))",
        primary: "rgba(var(--primary))",
        primaryl: "rgba(var(--primary-light))",
        primaryd: "rgba(var(--primary-dark))",
        accent: "rgba(var(--accent))",
        accentl: "rgba(var(--accent-light))",
        accentd: "rgba(var(--accent-dark))",
        textPrimary: "rgba(var(--text-color))",
        textl: "rgba(var(--text-color-light))",
        textd: "rgba(var(--text-color-dark))",
      },
    },
  },
  plugins: [],
}