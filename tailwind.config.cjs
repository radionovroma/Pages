module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extends: {
      colors: {
        blue: '#1b3764',
        yellow: '#ffca42',
        gray: '#f6f8fc',
      },
      fontFamily: {
        serif: ['Cardo', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
