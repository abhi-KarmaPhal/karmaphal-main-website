/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#010101",
        gold: "#D4AF37",
        silver: "#C0C0C0",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        gotu: ["var(--font-gotu)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
}
