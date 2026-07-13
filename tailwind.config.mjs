/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'oklch(0.05 0 0)',
        foreground: 'oklch(0.97 0 0)',
        card: 'oklch(0.09 0 0)',
        border: 'oklch(1 0 0 / 8%)',
        primary: 'oklch(0.94 0.21 112)',
        'primary-foreground': 'oklch(0.05 0 0)',
        'muted-foreground': 'oklch(0.65 0.02 65)',
        gray400: 'oklch(0.65 0.02 65)',
      },
      spacing: {
        container: '1rem',
      },
    },
  },
  plugins: [],
};
