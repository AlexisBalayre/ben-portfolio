# CLAUDE.md — Portfolio Benjamin Balayre

Site CV/portfolio personnel bilingue (FR/EN) de Benjamin Balayre, déployé en production sur Vercel.

---

## Stack technique

- **Framework** : Next.js 15 (Pages Router — pas App Router)
- **React** : 19
- **Langage** : TypeScript (strict)
- **CSS** : Tailwind CSS 3 + DaisyUI 4 (thème custom `mytheme` — bleu/blanc)
- **i18n** : next-i18next + react-i18next (FR par défaut, EN secondaire)
- **Animations** : Framer Motion
- **Icons** : Heroicons + FontAwesome
- **Deploy** : Vercel (production), branche `main`

---

## Structure du projet

```
ben-portfolio-1/
├── pages/                    # Routes Next.js (Pages Router)
│   ├── index.tsx             # Page CV — formations, expériences, aperçu portfolio/asso
│   ├── portfolio.tsx         # Page Portfolio créatif (photo/vidéo)
│   ├── associativeCareer.tsx # Parcours associatif (ISEP Live, Vizion BDE, ISEP Drone)
│   ├── _app.tsx              # Wrapper global (ErrorBoundary, Header, Footer, fonts)
│   └── _document.tsx         # Document HTML custom (meta, lang)
├── components/               # Composants React
│   ├── Header.tsx            # Header fixe avec nav pills + burger mobile
│   ├── Footer.tsx            # Footer avec coordonnées + réseaux sociaux
│   ├── HeroSection.tsx       # Hero parallax pour la page Portfolio
│   ├── BenevolenceSection.tsx# Section boutique fine art (Framer Motion)
│   ├── Projects.tsx          # Grille de projets vidéo (YouTube embeds)
│   ├── LatestProject.tsx     # Dernier projet vidéo (Norvège)
│   ├── SkillsSection.tsx     # Compétences créatives avec SkillCard
│   ├── SkillCard.tsx         # Carte skill individuelle
│   ├── Timeline.tsx          # Timeline formations (fond gris)
│   ├── TimelineDark.tsx      # Timeline expériences (fond blanc)
│   ├── Carousel.tsx          # Carousel images de voyage
│   ├── LanguageSwitcher.tsx  # Switcher FR/EN
│   ├── MetaHeader.tsx        # Meta tags SEO par page
│   └── ErrorBoundary.tsx     # Error boundary global
├── hooks/
│   ├── index.ts              # Re-exports des hooks
│   ├── useOutsideClick.ts    # Fermeture dropdown au clic extérieur
│   └── useParallax.ts        # Offset parallax au scroll
├── public/
│   ├── assets/
│   │   ├── data/             # JSON de contenu (experiences, formation, projects, skills, tech)
│   │   ├── documents/        # CVs PDF (FR + EN)
│   │   ├── images/           # Images optimisées AVIF/WebP (~45 Mo)
│   │   └── svg/              # Logos SVG (GitHub, LinkedIn, Instagram, Discord, YouTube)
│   ├── locales/
│   │   ├── fr/common.json    # Toutes les traductions françaises
│   │   └── en/common.json    # Toutes les traductions anglaises
│   ├── robots.txt
│   └── sitemap.xml
├── styles/                   # CSS global
├── next.config.mjs           # Config Next.js (i18n, images remote patterns, webpack)
├── next-i18next.config.js    # Config i18n (fr par défaut)
├── tailwind.config.ts        # Tailwind + DaisyUI config
└── tsconfig.json             # Path alias ~~ → racine du projet
```

---

## Alias de chemin

```ts
import Component from '~~/components/Component';
import data from '~~/public/assets/data/data.json';
```

Le `~~` est mappé vers la racine du projet (`"~~/*": ["./*"]` dans tsconfig.json).

---

## Internationalisation (i18n)

- Toutes les clés de traduction sont dans `public/locales/{fr,en}/common.json`
- Chaque page utilise `getStaticProps` avec `serverSideTranslations(locale, ['common'])`
- Hook : `const { t } = useTranslation('common')`
- Locale par défaut : **fr**
- Les URLs sans préfixe sont en français (`/portfolio`), en anglais : `/en/portfolio`

Pour ajouter une clé :
1. Ajouter dans `public/locales/fr/common.json`
2. Ajouter la traduction dans `public/locales/en/common.json`
3. Utiliser `{t('section.key')}` dans le composant

---

## Données JSON (contenu statique)

Tous les contenus dynamiques sont dans `public/assets/data/` :

| Fichier | Contenu |
|---|---|
| `experiences.json` | Expériences professionnelles (Timeline) |
| `formation.json` | Formations (Timeline) |
| `projects.json` | Projets vidéo/photo (YouTube embeds) |
| `skills.json` | Compétences créatives (SkillsSection) |
| `tech.json` | Compétences tech (carousel dans Header ou autre) |

Modifier ces fichiers suffit pour mettre à jour le contenu — pas besoin de toucher aux composants.

---

## Composants — conventions

- Tous les composants sont en `.tsx` dans `components/`
- Chargement dynamique (`next/dynamic`) utilisé dans `portfolio.tsx` pour les composants lourds
- Les images utilisent toujours `next/image` avec `fill`, `width/height`, `quality`, et `alt` renseignés
- Les liens externes ont systématiquement `target="_blank" rel="noopener noreferrer"`
- Les icônes SVG inline ont `aria-hidden="true"` ; les liens icône-only ont un `aria-label`

---

## Thème DaisyUI

Thème personnalisé `mytheme` défini dans `tailwind.config.ts` :

| Token | Valeur |
|---|---|
| `primary` | `#1e3a8a` (bleu marine) |
| `secondary` | `#0f172a` |
| `accent` | `#3b82f6` |
| `base-100` | `#ffffff` |

Classes utiles : `btn btn-primary text-base-100`, `bg-base-200`, `text-base-content`.

---

## Commandes

```bash
yarn dev        # Serveur de dev sur http://localhost:3000
yarn build      # Build de production
yarn start      # Serveur de production
yarn lint       # ESLint
```

Node.js requis : **>=24.0.0**. Package manager : **yarn** (v3.6.4).

---

## Déploiement (Vercel)

- Branch de production : `main`
- Chaque push sur `main` déclenche un déploiement automatique
- Les images locales sont servies depuis `/public/assets/images/` (AVIF/WebP via Next.js)
- Images distantes autorisées : GitHub (repository-images, avatars, raw, user-images, opengraph), balayre.com, alexis.balayre.com

**Ne jamais committer :**
- `images_original_backup/` (backup 243 Mo — supprimé)
- Fichiers `.env` ou secrets

---

## Pages et navigation

| Route | Page | Description |
|---|---|---|
| `/` | `index.tsx` | CV : formation, expériences, aperçu portfolio & asso |
| `/portfolio` | `portfolio.tsx` | Portfolio photo/vidéo + boutique Benevolence |
| `/associativeCareer` | `associativeCareer.tsx` | ISEP Live, Vizion BDE, ISEP Drone |

La nav est gérée dans `Header.tsx` via `menuLinks` (tableau exporté). "Contact" scrolle vers le footer.

---

## SEO

- `MetaHeader.tsx` : meta title, description, og:image par page
- `public/sitemap.xml` : sitemap statique (à mettre à jour manuellement si nouvelle page)
- `public/robots.txt` : autorisation crawl complet

---

## Points d'attention pour les agents

- **Pages Router uniquement** — ne pas migrer vers App Router sans décision explicite
- **Pas de base de données** — tout le contenu est dans les JSON de `public/assets/data/`
- **i18n obligatoire** — toute chaîne visible par l'utilisateur passe par `t('key')`
- **Images** : utiliser `next/image`, ne jamais utiliser `<img>` HTML natif
- **Tailwind only** — pas de CSS modules, pas de styled-components
- **DaisyUI** — utiliser les classes DaisyUI avant d'inventer des classes custom
- **TypeScript strict** — `ignoreBuildErrors: false`, toujours typer correctement
- **Yarn** — ne pas utiliser npm ou pnpm

---

## Skills actifs

- **ui-ux-pro-max** ([nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)) — Design intelligence : 67 styles UI, 161 palettes, 57 font pairings. Utiliser pour toute modification visuelle ou création de nouveau composant.
- **frontend-design** — Interfaces frontend production-grade, éviter les esthétiques génériques AI.
- **simplify** — Revue de code après modifications importantes.

---

## Ressources externes

- Portfolio photo : [benjaminbalayre.myportfolio.com](https://benjaminbalayre.myportfolio.com/)
- Boutique fine art : [benevolence.fr](https://benevolence.fr)
- Site Vercel : balayre.com
