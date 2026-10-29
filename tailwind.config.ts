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
        // From the HL Bars logo: charcoal wordmark and gray mark.
        charcoal: {
          50: '#F4F4F5',
          100: '#E4E5E7',
          600: '#5D5E63',
          700: '#4A4C51',
          800: '#3A3D42',
          900: '#2A2C30',
          950: '#1B1C1F',
        },
        // From the HL Bars logo: the orange bolt and L. 500 is the logo color;
        // 600 is the lightest shade readable as text on white.
        brand: {
          50: '#FFF4E8',
          100: '#FFE4C7',
          300: '#FDB566',
          400: '#F99B3A',
          500: '#F5841C',
          600: '#C2570A',
          700: '#9E4709',
          900: '#5C2A07',
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
