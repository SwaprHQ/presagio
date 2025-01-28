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
        grow: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cityFlip: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0' },
        },
      },
      animation: {
        'city-flip': 'cityFlip 200ms ease-in-out',
        grow: 'grow 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
