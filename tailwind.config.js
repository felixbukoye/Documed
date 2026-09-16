/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand / semantic tokens (see PRD §4.1)
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C3D0FC',
          300: '#9DB3FB',
          400: '#6C8CF8',
          500: '#3B63F5',
          600: '#2F5AF0',
          700: '#2348C9',
          800: '#1E3B9E',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          500: '#10B981',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        accent: {
          100: '#EDE9FE',
          300: '#C4B5FD',
          500: '#A78BFA',
          600: '#8B5CF6',
          700: '#7C3AED',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        surface: {
          white: '#FFFFFF',
          app: '#F4F6FB',
        },
      },
      fontFamily: {
        sans: [
          'Nunito',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 6px 16px rgba(16,24,40,0.06)',
        'card-hover':
          '0 2px 4px rgba(16,24,40,0.06), 0 12px 28px rgba(16,24,40,0.10)',
        dropdown:
          '0 10px 30px rgba(16,24,40,0.16), 0 2px 6px rgba(16,24,40,0.08)',
        ring: '0 0 0 3px rgba(47,90,240,0.18)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.28s ease-out both',
        'slide-in': 'slide-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
}
