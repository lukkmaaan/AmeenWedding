/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: '#4B5A45',
          light: '#5E6F57',
          dark: '#3C4838',
        },
        forest: {
          DEFAULT: '#283127',
          light: '#333F32',
          dark: '#1B211A',
        },
        ivory: {
          DEFAULT: '#F7F3EC',
          dark: '#EFE8D9',
        },
        gold: {
          DEFAULT: '#C9A66B',
          light: '#DCC08F',
          dark: '#AD8A54',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', '"Source Sans 3"', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
        widest3: '0.45em',
      },
      maxWidth: {
        invitation: '640px',
      },
      boxShadow: {
        card: '0 30px 80px -20px rgba(20, 24, 18, 0.45)',
        soft: '0 10px 40px -10px rgba(20, 24, 18, 0.25)',
      },
      keyframes: {
        marbleDrift: {
          '0%, 100%': { transform: 'scale(1.08) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.15) translate(-1.5%, -1%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '50.001%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marbleDrift: 'marbleDrift 22s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        scrollLine: 'scrollLine 2.4s ease-in-out infinite',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
