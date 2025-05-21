/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: 'rgb(var(--background-light) / <alpha-value>)',
          dark: 'rgb(var(--background-dark) / <alpha-value>)',
        },
        foreground: {
          light: 'rgb(var(--foreground-light) / <alpha-value>)',
          dark: 'rgb(var(--foreground-dark) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
