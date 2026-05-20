import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        foleman: {
          black: '#0a0a0a',
          yellow: '#FFD100',
          white: '#ffffff',
          graphite: '#151515',
          steel: '#9aa0a6',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        hero: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 48px rgba(255, 209, 0, 0.28)',
        'inner-line': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
