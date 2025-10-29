import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

/** @type {import('tailwindcss').Config} */
const config = {
  content: {
    files: [
      './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    extract,
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography, fluid],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    screens,
    fontSize,
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '73.1rem',
        lg: '54.4rem',
        md: '40.8rem',
        sm: '34rem',
        xl: '68rem',
      },
      // screens: {
      //   '2xl': '86rem',
      //   lg: '64rem',
      //   md: '48rem',
      //   sm: '40rem',
      //   xl: '80rem',
      // },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'loop-horizontally': 'loop-horizontally 20s linear infinite',
        'loop-testimonials': 'loop-testimonials 30s linear infinite',
        'loop-vertically': 'loop-vertically 30s linear infinite',
        'loop-vertically-top': 'loop-vertically-top 50s linear infinite',
        'loop-vertically-bottom': 'loop-vertically-bottom 50s linear infinite',
        'marquee-horizontally': 'marquee-top 30s linear infinite',
        'marquee-top': 'marquee-top 50s linear infinite',
        'marquee-right': 'marquee-right 25s linear infinite',
        'marquee-bottom': 'marquee-bottom 80s linear infinite',
        'marquee-left': 'marquee-left 25s linear infinite',
        tabs: 'tabs 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        fiyona: ['var(--font-fiyona)'],
        laquile: ['var(--font-laquile)'],
        laquileRounded: ['var(--font-laquile-rounded)'],
        laquileRough: ['var(--font-laquile-rough)'],
        laquileStamp: ['var(--font-laquile-stamp)'],
        martel: ['var(--font-martel)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
        'loop-horizontally': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'loop-testimonials': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-135rem)' },
        },
        'loop-vertically': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        'loop-vertically-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        'loop-vertically-bottom': {
          from: { transform: 'translateY(-50%)' },
          to: { transform: 'translateY(0)' },
        },
        'marquee-horizontally': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-top': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'marquee-bottom': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0%)' },
        },
        'marquee-left': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        tabs: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
