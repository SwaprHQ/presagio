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
        cityFlip: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0' },
        },
      },
      animation: {
        'city-flip': 'cityFlip 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
