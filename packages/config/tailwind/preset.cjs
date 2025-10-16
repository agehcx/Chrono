const sharedPreset = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D9488',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#1E3A8A',
          foreground: '#FFFFFF'
        }
      },
      borderRadius: {
        lg: '16px'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

module.exports = sharedPreset;
