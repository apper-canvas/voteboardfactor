/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        surface: '#FFFFFF',
        background: '#F9FAFB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      animation: {
        'scale-bounce': 'scaleBounce 0.3s ease-out',
      },
      keyframes: {
        scaleBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}