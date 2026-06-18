/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef9ff',
          100: '#d8f1ff',
          200: '#b9e8ff',
          300: '#88daff',
          400: '#50c3ff',
          500: '#28a6f5',
          600: '#0d88e6',
          700: '#0a6dbf',
          800: '#0e5a9d',
          900: '#114c81',
        },
        accent: {
          cyan:   '#06b6d4',
          blue:   '#60a5fa',
          purple: '#a78bfa',
          pink:   '#f472b6',
        },
        dark: {
          900: '#020817',
          800: '#050d1e',
          700: '#071020',
          600: '#0b1525',
          500: '#0f1d32',
          400: '#1a2d48',
          300: '#243d5e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(120,119,198,0.3), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(6,182,212,0.15), transparent), linear-gradient(180deg, #020817 0%, #050d1e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'glow-gradient': 'linear-gradient(90deg, #60a5fa, #06b6d4)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(2,8,23,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)',
        'glow-blue': '0 0 20px rgba(96,165,250,0.3), 0 0 40px rgba(96,165,250,0.1)',
        'card-hover': '0 20px 60px rgba(2,8,23,0.7), 0 0 30px rgba(96,165,250,0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
