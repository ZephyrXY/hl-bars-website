import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3FA',
          100: '#D6E1F1',
          600: '#1A4A8C',
          700: '#133B73',
          800: '#0D2C57',
          900: '#081D3B',
          950: '#051328',
        },
        copper: {
          50: '#FBF3EA',
          100: '#F4E0C8',
          300: '#E4AE72',
          400: '#D9954F',
          500: '#C47D37',
          600: '#A6652A',
          700: '#844F22',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
