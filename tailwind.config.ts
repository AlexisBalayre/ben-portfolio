import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

/**
 * Direction artistique — « éditorial bleu nuit ».
 *
 * Trois surfaces seulement : paper (blanc), mist (gris très clair), ink (bleu nuit).
 * Deux familles chromatiques : le bleu porte tout ce qui est académique,
 * l'ambre tout ce qui est professionnel. L'encre structure.
 */
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
        './public/assets/**/*.{js,ts,jsx,tsx,json,mdx}',
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#1e3a8a",          // bleu marine — académique, actions principales
                    "primary-content": "#ffffff",
                    "secondary": "#0f172a",        // encre — surfaces sombres, footer
                    "secondary-content": "#ffffff",
                    "accent": "#3b82f6",           // bleu vif — échanges, liserés
                    "accent-content": "#ffffff",
                    "neutral": "#1f2937",
                    "base-100": "#ffffff",         // paper
                    "base-200": "#f4f6fa",         // mist
                    "base-300": "#e3e8f0",         // filets et bordures
                    "base-content": "#0f172a",     // texte : encre plutôt que gris
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#b45309",
                    "error": "#f87272",
                },
            },
            "corporate",
        ],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
            },
            letterSpacing: {
                eyebrow: '0.22em',
            },
            borderRadius: {
                card: '1rem',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            keyframes: {
                'scroll-left-to-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                'scroll-infinite': 'scroll-left-to-right 60s linear infinite',
            },
        },
    },
    plugins: [daisyui],
}
export default config
