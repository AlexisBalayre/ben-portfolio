import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./public/assets/**/*.{js,ts,jsx,tsx,json,mdx}"
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#1e3a8a",
                    "secondary": "#0f172a",
                    "accent": "#3b82f6",
                    "neutral": "#1f2937",
                    "base-100": "#ffffff",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
            "corporate",
        ],
    },
    theme: {
        extend: {
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