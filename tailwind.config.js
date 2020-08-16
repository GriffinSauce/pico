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
          500: '#d900fc',
          600: '#c900ea',
          800: '#514baf',
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
    borderColor: ['hover', 'disabled'],
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
