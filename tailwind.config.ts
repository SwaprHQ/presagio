import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [require('@swapr/ui/tailwind-preset')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@swapr/ui/**/*.{js,ts,js,mjs}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        cityFlip: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-in',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'slide-out-to-right': 'slide-out-to-right 0.2s ease-in',
        'city-flip': 'cityFlip 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
