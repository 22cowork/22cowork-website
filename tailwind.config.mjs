/** @type {import("tailwindcss").Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif], // Elegant serif for headlines
        body: ['Inter', ...defaultTheme.fontFamily.sans], // Readable sans-serif for body
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono], // Monospace for accents
      },
      colors: {
        // Primary Backgrounds
        'warm-white': '#FDFDFD',
        'soft-off-white': '#F8F8F8',
        // Secondary Backgrounds/Accents
        'light-gray': '#E0E0E0',
        'graphite': '#333333',
        // Text Colors
        'text-black': '#000000',
        'text-dark-gray': '#555555',
        // Accent Color
        'forest-green': '#22574A',
        'forest-green-light': '#3F886B',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
