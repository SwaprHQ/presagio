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
      fontFamily: {
        os2: ['OpenSauceTwo', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      backgroundImage: {
        'gradient-border': `linear-gradient(90deg, 
          #4c21b612 56%, 
          var(--outline-warning-med-em) 63%, 
          #5a27da30 100%)`,
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cityFlip: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        'loading-dot': {
          '0%, 100%': { opacity: '0.2' },
          '20%': { opacity: '1' },
        },
        'border-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'loading-dot': 'loading-dot 1.4s infinite ease-in-out',
        'city-flip': 'cityFlip 200ms ease-in-out',
        grow: 'grow 0.2s ease-out',
        'border-rotate-fast': 'border-rotate 0.7s linear infinite',
        'border-rotate': 'border-rotate 5s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
