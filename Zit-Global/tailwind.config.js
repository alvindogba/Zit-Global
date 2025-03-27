import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000054',
        secondary: '#E32845',
        accent: '#060657',
        dparacolor: '1f2937',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        noto: ['Noto Serif', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
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
    },
  },
  plugins: [
    forms,
    aspectRatio,
  ],
};
