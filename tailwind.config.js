/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './adapters/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['12px', '130%'],
      xsm: ['14px', '140%'],
      sm: ['16px', '140%'],
      base: ['18px', '140%'],
      lg: ['20px', '140%'],
      xl: ['24px', '140%'],
      '2xl': ['26px', '140%'],
      '2.5xl': ['30px', '140%'],
      '3xl': ['34px', '140%'],
      '4xl': ['42px', '140%'],
      '5xl': ['55px', '140%'],
      '6xl': ['65px', '140%'],
      '7xl': ['80px', '140%'],
    },
    container: {
      padding: {
        DEFAULT: '2.5rem',
        lg: '5rem',
      },
    },
    screens: {
      xs: '375px',
      msm: '425px',
      sm: '480px',
      md: '768px',
      '2md': '980px',
      '2mdMax': { max: '980px' },
      '3md': '1024px',
      lg: '1280px',
      lgMax: { max: '1280px' },
      xl: '1440px',
      xlMax: { max: '1440px' },
      '2xl': '1920px',
    },
    extend: {
      fontFamily: {
        'inter-sans': ['Inter', 'sans-serif'],
      },
      width: {
        table: '100rem',
        form: '692px',
      },
      fontSize: {
        xxs: [
          '0.625rem',
          {
            lineHeight: '120%',
            letterSpacing: '0.01em',
          },
        ],
        'xs-sm': [
          '0.75rem',
          {
            lineHeight: '130%',
          },
        ],
      },
      cursor: {
        link: 'url(/hover.webp), pointer',
        drag: 'url(/drag.webp), grabbing',
      },
      colors: {
        black: {
          DEFAULT: '#072D46',
        },
        gray: {
          DEFAULT: '#828C9C',
          darker: '#DADFEA',
          light: '#F8FAFB',
          medium: '#F4FAFF',
        },
        white: '#FFFFFF',
        purple: {
          light: '#E7ECF8',
        },
        blue: {
          light: '#e8f5ff',
          DEFAULT: '#199AF5',
          darker: '#067FD3',
          dark: '#204258',
        },
        green: {
          DEFAULT: '#24D364',
          light: '#E4F9E6',
        },
        yellow: {
          DEFAULT: '#FFCD5A',
          light: '#FFF6E1',
        },
        red: {
          DEFAULT: '#E53636',
          medium: '#F7C3C3',
          light: '#FFE2E2',
        },
      },
      padding: {
        4.5: '1.125rem',
      },
      borderRadius: {
        base: '0.625rem',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'fade-in': 'fadeIn 3s ease-in-out',
        'fade-in-image': 'fadeInImage 3s ease-in-out',
        'appear-left-side-0.8': 'appearLeft 0.8s ease-in-out',
        'appear-left-side-0.65': 'appearLeft 0.65s ease-in-out',
        'clock-spin': 'clockRotate 3s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        appearLeft: {
          '0%': { translate: '100%' },
          '100%': { translate: '0%' },
        },
        listAppearance: {
          '0%': {
            opacity: 0,
          },
        },
        fadeInImage: {
          '0%': { opacity: 0.4 },
          '100%': { opacity: 1 },
        },
        clockRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        xmd: '0 4px 20px #DEE3EE',
        '2xmd': '0 2px 6px #CED5E7;',
        vInset: '0 -6px 7px -7px #C4C4C4 inset , 0 6px 7px -7px #C4C4C4 inset',
      },
      zIndex: {
        100: '100',
      },
    },
  },
  variants: {
    extend: {
      // ...
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [require('@tailwindcss/typography')], // eslint-disable-line
  future: {
    hoverOnlyWhenSupported: true,
  },
};
