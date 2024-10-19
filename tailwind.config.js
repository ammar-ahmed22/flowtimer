const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.875rem', '1.25rem'],
        sm: ['1rem', '1.5rem'],
        base: ['1.125rem', '1.75rem'],
        lg: ['1.25rem', '2rem'],
        xl: ['1.5rem', '2rem'],
        '2xl': ['1.875rem', '2.25rem'],
        '3xl': ['2.25rem', '2.5rem'],
        '4xl': ['3rem', '1'],
        '5xl': ['3.75rem', '1'],
        '6xl': ['4.5rem', '1'],
        '7xl': ['6rem', '1'],
        '8xl': ['8rem', '1'],
        '9xl': ['10rem', '1'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'flowtimer',
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              50: '#f6f6fc',
              100: '#efeef9',
              200: '#e1dff5',
              300: '#cac6ec',
              400: '#afa5e0',
              500: '#9382d2',
              600: '#7e64c3',
              700: '#6d52af',
              800: '#5c4493',
              900: '#4c3979',
              foreground: '#000000',
              DEFAULT: '#9382d2',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#f6f6fc',
              100: '#efeef9',
              200: '#e1dff5',
              300: '#cac6ec',
              400: '#afa5e0',
              500: '#9382d2',
              600: '#7e64c3',
              700: '#6d52af',
              800: '#5c4493',
              900: '#4c3979',
              foreground: '#000000',
              DEFAULT: '#9382d2',
            },
          },
        },
      },
    }),
  ],
}
