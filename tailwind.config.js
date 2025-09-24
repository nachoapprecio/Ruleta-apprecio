/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-wheel': 'spinWheel var(--duration) cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards',
      },
      keyframes: {
        spinWheel: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(var(--final-rotation))' }
        }
      },
      colors: {
        wheel: {
          primary: '#3B82F6',
          secondary: '#EF4444',
          accent: '#10B981',
          warning: '#F59E0B',
          purple: '#8B5CF6',
          pink: '#EC4899',
        }
      }
    },
  },
  plugins: [],
}