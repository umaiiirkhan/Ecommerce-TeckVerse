/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Category-specific themes
        gadgets: {
          100: '#f0f7ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        watches: {
          100: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
        phones: {
          100: '#f5f3ff',
          500: '#8b5cf6',
          900: '#4c1d95',
        },
        laptops: {
          100: '#ecfdf5',
          500: '#10b981',
          900: '#064e3b',
        },
        accessories: {
          100: '#fff7ed',
          500: '#f97316',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};