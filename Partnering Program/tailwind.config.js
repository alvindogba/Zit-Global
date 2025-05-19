/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        noto: ['Noto Serif', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#000054',
        secondary: '#E32845',
        main: '#000054',
        accent: '#060657',
        dparacolor: '#1f2937',
      },
      fontSize: {
        h1: ['1.75rem', { lineHeight: '1.3', fontWeight: '700' }], // 28px        
        h2: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        h3: ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }], // 20px
        h4: ['1.125rem', { lineHeight: '1.3', fontWeight: '500' }], // 18px
        h5: ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }], // 20px
        h6: ['1rem', { lineHeight: '1.3', fontWeight: '400' }], // 16px
        p: ['1rem', { lineHeight: '1.3', fontWeight: '400' }], // 16px
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};