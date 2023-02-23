module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './assets/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xsm: ['14px', '130%'],
      sm: ['16px', '130%'],
      base: ['18px', '130%'],
      lg: ['20px', '130%'],
      xl: ['24px', '130%'],
      '2xl': ['26px', '130%'],
      '3xl': ['34px', '130%'],
      '4xl': ['42px', '130%'],
      '5xl': ['55px', '130%'],
      '6xl': ['65px', '130%'],
      '7xl': ['80px', '130%'],
    },
    container: {
      padding: {
        DEFAULT: '2.5rem',
        lg: '5rem',
      },
    },
    screens: {
      xs: '375px',
      '2xs': '480px',
      sm: '768px',
      '2sm': '980px',
      '3sm': '1024px',
      md: '1280px',
      lg: '1440px',
      '2lg': '1920px',
    },
    extend: {
      fontFamily: {
        'kumbh-sans': ['Kumbh Sans', 'sans-serif'],
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
        },
        white: '#FFFFFF',
        purple: {
          light: '#E7ECF8',
        },
        blue: {
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
      },
      boxShadow: {
        xmd: '0 4px 20px #DEE3EE',
        '2xmd': '0 2px 6px #CED5E7;',
      },
    },
  },
  variants: {
    extend: {
      // ...
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
};
