const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#E2E8F0',
        input: '#EDF2F7',
        ring: '#0A2F5C',
        foreground: '#2D3748',
        background: {
          DEFAULT: '#F5F5F5',
          glass: 'rgba(255, 255, 255, 0.15)',
        },
        primary: {
          DEFAULT: '#0A2F5C',
          foreground: '#FFFFFF',
          light: '#2556A3',
          dark: '#072340',
        },
        secondary: {
          DEFAULT: '#025E73',
          foreground: '#FFFFFF',
          light: '#127D96',
          dark: '#014A5C',
        },
        destructive: {
          DEFAULT: '#B22222',
          foreground: '#FFFFFF',
          light: '#D04545',
          dark: '#8B1A1A',
        },
        muted: {
          DEFAULT: '#F0F2F5',
          foreground: '#718096',
          dark: '#E1E5EA',
        },
        accent: {
          DEFAULT: '#F2A71B',
          foreground: '#011F26',
          light: '#FFC045',
          dark: '#CD8A10',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3748',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0A2F5C',
          glass: 'rgba(255, 255, 255, 0.12)',
        },
        metal: {
          DEFAULT: '#6E7E91',
          light: '#99A6B8',
          dark: '#4A5568',
        },
        obsidian: {
          DEFAULT: '#1A2C42',
          light: '#2A3F5A',
          dark: '#0F1C2E',
        },
        custom: {
          blue: '#025E73',
          dark: '#011F26',
          olive: '#A5A692',
          sand: '#BFB78F',
          gold: '#F2A71B',
          aurora: '#38B2AC',
        },
        light: '#F8FAFC',
        text: {
          DEFAULT: '#2D3748',
          muted: '#718096',
          light: '#F7FAFC',
          gradient: 'linear-gradient(90deg, #0A2F5C, #F2A71B)',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px -2px rgba(15, 76, 129, 0.08), 0 2px 6px -1px rgba(15, 76, 129, 0.05)',
        button: '0 2px 4px rgba(15, 76, 129, 0.15)',
        neon: '0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        tilt: '0 10px 20px rgba(15, 76, 129, 0.2)',
        soft: '0 5px 15px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '0.75rem',
        xxl: '1.5rem',
      },
      backdropBlur: {
        glass: '8px',
        subtle: '4px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgba(15, 76, 129, 0.2) 0%, rgba(15, 76, 129, 0) 70%)',
        'gradient-aurora': 'linear-gradient(45deg, #0A2F5C, #025E73, #F2A71B)',
        'gradient-professional': 'linear-gradient(180deg, rgba(10, 47, 92, 0.03) 0%, rgba(10, 47, 92, 0.06) 100%)',
        'pattern-grid': 'linear-gradient(to right, #0A2F5C 1px, transparent 1px), linear-gradient(to bottom, #0A2F5C 1px, transparent 1px)',
        'pattern-dots': 'radial-gradient(#0A2F5C 1px, transparent 1px)',
      },
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: 'rgba(10, 47, 92, 0.3)' },
          '50%': { borderColor: 'rgba(10, 47, 92, 0.8)' },
        },
        borderReveal: {
          '0%': { borderWidth: '1px', borderColor: 'transparent' },
          '100%': { borderWidth: '1px', borderColor: 'currentColor' },
        },
        gradientBorder: {
          '0%': { borderImage: 'linear-gradient(to right, #0A2F5C, #F2A71B) 1' },
          '50%': { borderImage: 'linear-gradient(to right, #F2A71B, #0A2F5C) 1' },
          '100%': { borderImage: 'linear-gradient(to right, #0A2F5C, #F2A71B) 1' },
        },
        focusBorder: {
          '0%': { boxShadow: '0 0 0 0 rgba(10, 47, 92, 0)' },
          '50%': { boxShadow: '0 0 0 4px rgba(10, 47, 92, 0.3)' },
          '100%': { boxShadow: '0 0 0 0 rgba(10, 47, 92, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        neonGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.05)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        sparkle: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
          '50%': { boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.7)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
        },
        gradientText: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'select-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      animation: {
        'pulse-border': 'pulseBorder 2s ease-in-out infinite',
        'pulse-scale': 'pulse-scale 3s ease-in-out infinite',
        'border-reveal': 'borderReveal 0.8s ease forwards',
        'gradient-border': 'gradientBorder 3s ease infinite',
        'focus-border': 'focusBorder 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'neon-glow': 'neonGlow 1.5s ease-in-out infinite',
        'spin-slow': 'spinSlow 10s linear infinite',
        'bounce-in': 'bounceIn 0.6s ease-out',
        sparkle: 'sparkle 1s ease-in-out',
        'gradient-text': 'gradientText 4s ease infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'select-bounce': 'select-bounce 0.2s ease-in-out',
      },
      transitionProperty: {
        transform: 'transform, opacity, box-shadow',
        'border-gradient': 'border-image',
      },
      height: {
        'screen-safe': ['100vh', '100dvh'],
        'dynamic': 'calc(100vh - var(--nav-height, 0px))',
      },
      spacing: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};