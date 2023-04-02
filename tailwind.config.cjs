module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './public/index.html'
  ],
  theme: {
    boxShadow: {
      'md': '0px 10px 15px -5px rgba(0, 0, 0, 0.25)',
      'xl': '0px 20px 25px rgba(0, 0, 0, 0.2)',
      '2xl': '0 45px 25px rgba(0, 0, 0, 0.25)',
    },
    dropShadow: {
      '2xl': '0 45px 25px rgba(0, 0, 0, 0.25)',
    },
    fontFamily: {
      serif: ['Cardo', 'serif'],
      sans: ['Inter', 'sans-serif'],
    },
    rotate: {
      '45': '45deg',
      '315': '315deg',
    },
    spacing: {
      '0': '0',
      '10': '10px',
      '15': '15px',
      '20': '20px',
      '25': '25px',
      '30': '30px',
      '35': '35px',
      '40': '40px',
      '50': '50px',
      '65': '65px',
      '90': '90px',
      '120': '120px',
      '200': '200px',
      '230': '230px',
      '300': '300px',
      '350': '350px',
      '600': '600px',
      '660': '660px',
      'cont': '1300px',
      'cont+': '1420px',
      'full': '100%',
    },
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      backgroundImage: {
        'error-page': "url('@img/bgErrorPage.jpg')",
      },
      colors: {
        blue: '#1b3764',
        jeans: '#3266b8',
        lightBlue: '#b4c7e7',
        yellow: '#ffca42',
        gold: '#ffba00',
        lightGray: '#dddfe2',
        gray: '#969AA0',
        white: '#ffffff',
      },
      gridTemplateColumns: {
        'catalog': '302px repeat(1, minmax(0, 1fr))',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        }
      },
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
