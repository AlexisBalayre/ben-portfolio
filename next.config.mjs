/** @type {import('next').NextConfig} */

// Les en-tetes de securite, poses sur toutes les routes. Le site n'a ni API,
// ni formulaire, ni script tiers : la CSP peut donc rester serree. Le seul
// assouplissement est `unsafe-inline` sur les scripts, que Next impose tant
// que `__NEXT_DATA__` est injecte en ligne sans nonce, ce qui est le cas en
// Pages Router. `frame-ancestors 'none'` est ce qui ferme le clickjacking :
// il double X-Frame-Options, que les vieux navigateurs sont seuls a lire.
//
// HSTS n'est volontairement pas pose ici : Cloudflare, qui est devant Vercel,
// l'envoie deja. Deux sources pour un meme en-tete finissent par diverger.
const CSP = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
    { key: 'Content-Security-Policy', value: CSP },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
];

const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    webpack: config => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        qualities: [75, 80, 85, 90],
        // Pas de `remotePatterns` : toutes les images du site vivent dans
        // /public/assets/images. En autoriser un hote distant, meme le sien,
        // ouvre /_next/image comme proxy : n'importe qui peut alors faire
        // servir et optimiser par ce domaine une image qu'il choisit, aux
        // frais du plan Vercel. Si une image distante devient necessaire un
        // jour, la declarer avec un `pathname` precis, jamais un hote nu.
    },
    // /portfolio a vecu sur ce domaine : les liens entrants et le referencement
    // acquis partent vers le site de prestations plutot que vers un 404.
    async redirects() {
        return [
            { source: '/portfolio', destination: 'https://prestation.benevolence.fr', permanent: true },
            { source: '/en/portfolio', destination: 'https://prestation.benevolence.fr', permanent: true },
        ];
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "fr",
    },
};

export default nextConfig;
