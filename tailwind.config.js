module.exports = {
  // mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './assets/**/*.{js,ts,jsx,tsx}'],
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
    screens: {
      xs: '375px',
      '2xs': '480px',
      sm: '768px',
      '2sm': '980px',
      md: '1280px',
      lg: '1440px',
      '2lg': '1920px',
    },
    extend: {
      fontFamily: {
        'kumbh-sans': ['Kumbh Sans', 'sans-serif'],
      },
      cursor: {
        link: 'url(/hover.webp), pointer',
        drag: 'url(/drag.webp), grabbing',
      },
      colors: {
        black: {
          DEFAULT: '#2D2D2D',
        },
        gray: {
          DEFAULT: '#57617A',
          light: '#F3F4F6',
        },
        white: '#FFFFFF',
        lightBlue: {
          DEFAULT: '#F0F0F0',
        },
        greyDescriptive: {
          DEFAULT: '#595959',
        },
        primary: {
          DEFAULT: '#4286C5',
          darker: '#1A5E9D',
        },
        secondary: {
          DEFAULT: '#97A3B7',
          darker: '#374151',
          light: '#E2E7EB',
        },
        error: {
          DEFAULT: '#FF4B55',
          light: '#FFF6F7',
          dark: '#FFCED1',
        },
        tertiary: {
          DEFAULT: '#BBCAD7',
        },
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
