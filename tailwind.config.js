/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
        logo: ['"Noto Serif"', 'serif'],
      },
      colors: {
        actalon: {
          navy: '#1e293b', // Dark blue from logo
          gold: '#d4af37',
          cream: '#f8f5f2',
          light: '#f1f5f9'
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: theme('colors.slate.600'),
            lineHeight: '1.8',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            h1: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.actalon.navy'),
            },
            h2: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.actalon.navy'),
              marginTop: '2em',
              marginBottom: '1em',
              fontWeight: '700',
            },
            h3: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.actalon.navy'),
              marginTop: '1.5em',
              marginBottom: '0.75em',
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.actalon.navy'),
              fontWeight: '700',
            },
            a: {
              color: theme('colors.actalon.gold'),
              '&:hover': {
                color: theme('colors.actalon.navy'),
              },
            },
            'ul > li::marker': {
              color: theme('colors.actalon.gold'),
            },
            blockquote: {
              borderLeftColor: theme('colors.actalon.gold'),
              backgroundColor: theme('colors.actalon.cream'),
              color: theme('colors.actalon.navy'),
              fontStyle: 'italic',
              padding: '1rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontWeight: '500',
              marginTop: '2em',
              marginBottom: '2em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}