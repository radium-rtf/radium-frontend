import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-nt-somic)'],
      },
      colors: {
        bg: {
          page: '#222526',
        },
        background: {
          default: '#222526',
          card: '#2E3233',
          overlay: '#393E40',
        },
        foreground: {
          default: '#E6E6E6',
          secondary: '#B3B3B3',
        },
        primary: {
          default: '#BFD5FF',
          foreground: '#303A40',
        },
        secondary: {
          default: '#CEF2CE',
          disabled: '#788B7A',
          hovered: '#D8F5D8',
          pressed: '#B9DAB9',
          foreground: '#364036',
        },
        destructive: {
          default: '#F29191',
          disabled: '#8A5B5C',
          hovered: '#F5A7A7',
          pressed: '#DA8282',
          foreground: '#402626',
        },
        accent: {
          primary: {
            100: '#C5D9FF',
            200: '#BFD5FF',
            300: '#ACC0E6',
            400: '#707D93',
            500: '#657183',
          },
          secondary: {
            100: '#D8F5D8',
            200: '#D3F3D3',
            300: '#CEF2CE',
            400: '#B9DAB9',
            500: '#ADC4AD',
            600: '#A5C2A5',
            700: '#94AE94',
            800: '#879B88',
            900: '#788B7A',
            1000: '#606F62',
            1100: '#364036',
          },
          destructive: {
            100: '#F5A7A7',
            200: '#DA8282',
            300: '#F29191',
            400: '#DA8282',
            500: '#C48686',
            600: '#C27474',
            700: '#AE6868',
            800: '#8A5B5B',
            900: '#6E4949',
            1000: '#402626',
          },
        },
        grey: {
          100: '#848586',
          200: '#747576',
          300: '#4E5151',
          400: '#383A3B',
          500: '#383A3C',
          600: '#2D2F2F',
          700: '#202324',
          800: '#1A1C1D',
        },
        text: {
          primary: '#E6E6E6',
          secondary: '#B3B3B3',
        },
      },
    },
  },
  plugins: [],
};
export default config;
