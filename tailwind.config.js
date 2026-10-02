/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B0F19',
          800: '#0D1321',
          700: '#111827',
          600: '#1a2235',
          500: '#1e2a40',
        },
        cyber: {
          cyan: '#00F2FE',
          red: '#FF3366',
          green: '#00E676',
          yellow: '#FFD600',
          purple: '#9B59B6',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-red': 'pulseRed 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-cyan': 'pulseCyan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px #FF3366' },
          '50%': { opacity: '0.5', boxShadow: '0 0 40px #FF3366, 0 0 80px #FF3366' },
        },
        pulseCyan: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px #00F2FE' },
          '50%': { opacity: '0.7', boxShadow: '0 0 30px #00F2FE, 0 0 60px #00F2FE' },
        },
        glow: {
          from: { textShadow: '0 0 10px #00F2FE, 0 0 20px #00F2FE' },
          to: { textShadow: '0 0 20px #00F2FE, 0 0 40px #00F2FE, 0 0 60px #00F2FE' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
