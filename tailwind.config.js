module.exports = {
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
  },
  theme: {
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '10rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        violet: {
          100: '#f6c0ff',
          200: '#f199ff',
          300: '#e859ff',
          400: '#d900fc',
          500: '#c900ea',
          600: '#514baf',
          700: '#2a277c',
          800: '#131042',
          900: '#020021',
        },
      },
    },
  },
  variants: {
    backgroundColor: [
      'responsive',
      'first',
      'last',
      'even',
      'odd',
      'hover',
      'focus',
      'group-hover',
      'disabled',
    ],
    borderRadius: ['responsive', 'first', 'last'],
    borderColor: ['hover', 'disabled', 'focus'],
    textColor: [
      'responsive',
      'first',
      'last',
      'even',
      'odd',
      'hover',
      'focus',
      'group-hover',
      'disabled',
    ],
  },
  plugins: [],
};
