/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: '#FDB813', // Bee Yellow for buttons and highlights
          600: '#E5A700', // Darker yellow for hover states
          100: '#FEF3CD', // Light yellow for backgrounds
        },
        orange: {
          500: '#FF9800', // Honey Orange for accents
          600: '#F57C00', // Darker orange for hover states
          100: '#FFE0B2', // Light orange for backgrounds
        },
        gray: {
          900: '#222222', // Charcoal Black for primary text
          50: '#F5F5F5', // Light Gray for secondary sections
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};