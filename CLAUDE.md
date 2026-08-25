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
- **Police** : Plus Jakarta Sans **auto-hébergée** via `next/font/local` (fichier variable latin dans `src/fonts/`) — ne pas repasser sur `next/font/google` : le build redeviendrait dépendant du réseau
- **Deploy** : Vercel (production), branche `main`

---

## Structure du projet

```
ben-portfolio/
├── src/
│   ├── pages/                    # Routes Next.js (Pages Router)
│   │   ├── index.tsx             # Page CV — formations, expériences, aperçu portfolio/asso
│   │   ├── portfolio.tsx         # Page Portfolio créatif (photo/vidéo)
│   │   ├── associativeCareer.tsx # Parcours associatif (ISEP Live, Vizion BDE, ISEP Drone)
│   │   ├── _app.tsx              # Wrapper global (ErrorBoundary, Header, Footer, fonts)
│   │   └── _document.tsx         # Document HTML custom (meta, lang)
│   ├── components/               # Composants React
│   │   ├── Header.tsx            # Header fixe avec nav pills + burger mobile
│   │   ├── Footer.tsx            # Footer avec coordonnées + réseaux sociaux
│   │   ├── HeroSection.tsx       # Hero parallax pour la page Portfolio
│   │   ├── BenevolenceSection.tsx# Section boutique fine art (Framer Motion)
│   │   ├── Projects.tsx          # Grille de projets vidéo (YouTube embeds)
│   │   ├── LatestProject.tsx     # Dernier projet vidéo (Norvège)
│   │   ├── SkillsSection.tsx     # Compétences créatives avec SkillCard
│   │   ├── SkillCard.tsx         # Carte skill individuelle
│   │   ├── Timeline.tsx          # Timeline formations (fond gris) — imbrique les échanges
│   │   ├── TimelineDark.tsx      # Timeline expériences (fond blanc)
│   │   ├── ParallelTimeline.tsx  # Frise Gantt formation / expérience + repère « aujourd'hui »
│   │   ├── SkillTree.tsx         # Arbre de compétences : carte explorable, chaînes de prérequis
│   │   ├── Carousel.tsx          # Carousel images de voyage
│   │   ├── LanguageSwitcher.tsx  # Switcher FR/EN
│   │   ├── MetaHeader.tsx        # Meta tags SEO par page
│   │   ├── ErrorBoundary.tsx     # Error boundary global
│   │   └── CustomCursor.tsx      # Curseur custom — actuellement importé nulle part
│   ├── hooks/
│   │   ├── index.ts              # Re-exports des hooks
│   │   ├── useOutsideClick.ts    # Fermeture dropdown au clic extérieur
│   │   └── useParallax.ts        # Offset parallax au scroll
│   ├── styles/
│   │   └── globals.css           # CSS global (importé dans _app.tsx)
│   └── fonts/
│       └── PlusJakartaSans-latin-variable.woff2  # Police auto-hébergée (next/font/local)
├── public/
│   ├── assets/
│   │   ├── data/                 # JSON de contenu (experiences, formation, projects, skills, tech)
│   │   ├── documents/            # CVs PDF (FR + EN)
│   │   ├── images/               # Images optimisées AVIF/WebP (~45 Mo)
│   │   └── svg/                  # Composants React de logos SVG (GitHub, LinkedIn, Instagram, Discord, YouTube)
│   ├── locales/
│   │   ├── fr/common.json        # Toutes les traductions françaises
│   │   └── en/common.json        # Toutes les traductions anglaises
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.mjs               # Config Next.js (i18n, images remote patterns, webpack)
├── next-i18next.config.js        # Config i18n (fr par défaut)
├── tailwind.config.ts            # Tailwind + DaisyUI config
└── tsconfig.json                 # Path alias ~~ → racine, @ → src/
```

---

## Alias de chemin

```ts
import Component from '~~/src/components/Component';
import data from '~~/public/assets/data/data.json';
```

Deux alias sont définis dans `tsconfig.json` :

- `~~/*` → racine du projet (`["./*"]`) — utilisé partout dans le code actuel, y compris pour les composants (`~~/src/components/...`)
- `@/*` → dossier `src` (`["./src/*"]`) — déclaré mais pas encore utilisé

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
| `skillTree.json` | Arbre de compétences (`SkillTree`) — branches + cases |

Modifier ces fichiers suffit pour mettre à jour le contenu — pas besoin de toucher aux composants.

**Attention** : pour `experiences.json` et `formation.json`, le texte affiché vient **toujours** des locales (`experiences.<id>.title` / `.description` / `.period` / `.short`). Le JSON ne porte que la structure :

| Champ | Utilisé par | Rôle |
|---|---|---|
| `id`, `logo` | `Timeline`, `TimelineDark` | clé de traduction + logo rond |
| `period` | — | mémo lisible ; l'affichage passe par la locale |
| `nature` | `ParallelTimeline` | surtitre en petites majuscules sur la barre — clé de `journey.nature.*` (`cursus`, `exchange`, `internship`, `freelance`, `permanent`) |
| `start`, `end` | `ParallelTimeline` | `"AAAA-MM"`, **borne de fin exclusive** (le mois qui suit le dernier mois actif). Sans ces champs, l'entrée n'apparaît pas dans la frise |
| `ongoing` | `ParallelTimeline` | flèche « → » + dégradé de fuite : l'activité se poursuit au-delà de la frise |
| `integratedIn` | `ParallelTimeline` | *(experiences.json)* id du cursus : le stage passe dans la voie **Formation**, sous-groupe « Stages intégrés au cursus », au lieu de la voie Expérience |
| `exchanges[]` | `Timeline` + `ParallelTimeline` | *(formation.json)* échanges menés **pendant** ce cursus : sous-branche dans la timeline, segment ambre à l'intérieur de la barre dans la frise |

Ajouter une entrée = 1 bloc dans le JSON + les clés `title`, `description`, `period`, `short` dans `fr/common.json` **et** `en/common.json`.

Pour `skillTree.json` : un tableau de domaines, chacun avec un `id` et ses `nodes`. Chaque node porte `id`, `icon` (clé de la table `ICONS` du composant, pas un emoji), `status` (`unlocked` | `progress` | `locked`) et un `after` optionnel — la liste de ses prérequis. C'est `after` qui dessine les flèches : sans lui, la compétence part directement de la racine.

Le placement est automatique. `SkillTree` déduit la profondeur de chaque compétence de sa chaîne de prérequis, empile les domaines en voies de hauteur variable (une voie qui bifurque prend deux rangées et décale les suivantes) et trace des liaisons orthogonales fléchées. Aucune coordonnée à saisir ; ajouter une compétence = un bloc dans `nodes` + `skill_tree.nodes.<id>.name` / `.desc` en FR **et** EN, plus une entrée dans `ICONS` si l'icône Heroicon n'y est pas déjà.

Les cartes affichent icône + intitulé ; la description et le statut apparaissent dans l'infobulle au survol (ou au clic sur mobile). La fenêtre se déplace à la souris, zoome à la molette (0,5× à 1,8×) et se recentre via les boutons en haut à droite.

`projects.json` et `tech.json` ne sont importés par aucun composant à ce jour (`skills.json` l'est dans `src/pages/portfolio.tsx`).

---

## Composants — conventions

- Tous les composants sont en `.tsx` dans `src/components/`
- Chargement dynamique (`next/dynamic`) utilisé dans `src/pages/portfolio.tsx` pour les composants lourds
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
| `/` | `src/pages/index.tsx` | CV : frise parcours (`#parcours`), formation (`#education`), expériences (`#experience`), arbre de compétences (`#competences`), aperçu portfolio & asso |
| `/portfolio` | `src/pages/portfolio.tsx` | Portfolio photo/vidéo + boutique Benevolence |
| `/associativeCareer` | `src/pages/associativeCareer.tsx` | ISEP Live, Vizion BDE, ISEP Drone |

La nav est gérée dans `src/components/Header.tsx` via `menuLinks` (tableau exporté). "Contact" scrolle vers le footer.

---

## SEO

- `src/components/MetaHeader.tsx` : meta title, description, og:image par page
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
