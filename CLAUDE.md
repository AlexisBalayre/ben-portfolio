# CLAUDE.md · Portfolio Benjamin Balayre

Site CV personnel bilingue (FR/EN) de Benjamin Balayre, déployé en production sur Vercel.

Le volet créatif ne vit **pas** ici : les prestations photo et vidéo ont leur propre site,
[prestation.benevolence.fr](https://prestation.benevolence.fr). Ce site-ci reste neutre. Il en dit
le minimum sur une page dédiée, `/prestation`, qui pose le contexte et ouvre la porte : offres,
réalisations et devis restent sur le site de prestations, jamais recopiés ici.

---

## Stack technique

- **Framework** : Next.js 15 (Pages Router, pas App Router)
- **React** : 19
- **Langage** : TypeScript (strict)
- **CSS** : Tailwind CSS 3 + DaisyUI 4 (thème custom `mytheme`). Voir **Direction artistique** plus bas
- **i18n** : next-i18next + react-i18next (FR par défaut, EN secondaire)
- **Animations** : Framer Motion
- **Icons** : Heroicons + FontAwesome
- **Police** : Plus Jakarta Sans **auto-hébergée** via `next/font/local` (fichier variable latin dans `src/fonts/`). Ne pas repasser sur `next/font/google` : le build redeviendrait dépendant du réseau
- **Deploy** : Vercel (production), branche `main`

---

## Structure du projet

```
ben-portfolio/
├── src/
│   ├── pages/                    # Routes Next.js (Pages Router)
│   │   ├── index.tsx             # Accueil : héros + 3 chapitres (parcours, image, associatif)
│   │   ├── associativeCareer.tsx # Parcours associatif : héros, sommaire, 3 chapitres (données)
│   │   ├── prestation.tsx        # Photo & vidéo : présentation courte, 3 familles, CTA sortant
│   │   ├── _app.tsx              # Wrapper global (ErrorBoundary, Header, Footer, fonts)
│   │   └── _document.tsx         # Document HTML custom (lang, favicon)
│   ├── components/
│   │   ├── ui/                   # Socle de la DA : toute section neuve passe par là
│   │   │   ├── Section.tsx       # Surface + rythme vertical + container + apparition
│   │   │   ├── SectionHeading.tsx# Numéro de chapitre + surtitre + titre + chapô
│   │   │   ├── PageHero.tsx      # Héros de page intérieure (photo + voile encre)
│   │   │   ├── Action.tsx        # actionClasses() : géométrie unique des boutons
│   │   │   ├── motion.ts         # EASE, VIEWPORT, fadeUp, fadeIn, stagger
│   │   │   └── index.ts          # Ré-exports
│   │   ├── Header.tsx            # Header fixe (hauteur = --header-h) + burger mobile
│   │   ├── Footer.tsx            # Footer encre : identité, navigation, contact, réseaux
│   │   ├── JourneyDetail.tsx     # Onglets Formation / Expérience au-dessus de Timeline
│   │   ├── Timeline.tsx          # Timeline verticale, imbrique les échanges
│   │   ├── ParallelTimeline.tsx  # Frise Gantt formation / expérience + repère « aujourd'hui »
│   │   ├── ProjectCards.tsx      # Les projets menés en indépendant (chapitre 02)
│   │   ├── AssociativePreview.tsx# Aperçu du parcours associatif sur l'accueil
│   │   ├── AssoChapter.tsx       # Un engagement associatif, piloté par la donnée
│   │   ├── LanguageSwitcher.tsx  # Switcher FR/EN
│   │   ├── MetaHeader.tsx        # Meta tags SEO par page (dont viewport)
│   │   └── ErrorBoundary.tsx     # Error boundary global
│   ├── data/
│   │   └── journey.ts            # Typage et dérivations des JSON parcours (source unique)
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
│   │   ├── data/                 # JSON de contenu (associations, experiences, formation, skills)
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

- `~~/*` → racine du projet (`["./*"]`), utilisé partout dans le code actuel, y compris pour les composants (`~~/src/components/...`)
- `@/*` → dossier `src` (`["./src/*"]`), déclaré mais pas encore utilisé

---

## Internationalisation (i18n)

- Toutes les clés de traduction sont dans `public/locales/{fr,en}/common.json`
- Chaque page utilise `getStaticProps` avec `serverSideTranslations(locale, ['common'])`
- Hook : `const { t } = useTranslation('common')`
- Locale par défaut : **fr**
- Les URLs sans préfixe sont en français (`/associativeCareer`), en anglais : `/en/associativeCareer`

Pour ajouter une clé :
1. Ajouter dans `public/locales/fr/common.json`
2. Ajouter la traduction dans `public/locales/en/common.json`
3. Utiliser `{t('section.key')}` dans le composant

---

## Données JSON (contenu statique)

Tous les contenus dynamiques sont dans `public/assets/data/` :

| Fichier | Contenu |
|---|---|
| `experiences.json` | Expériences professionnelles et projets image (Timeline, frise, chapitre 02) |
| `formation.json` | Formations (Timeline, frise) |
| `associations.json` | Engagements associatifs (frise, aperçu de l'accueil). Les dates vivent dans `roles[]`, pas au niveau de l'entrée |
| `projects.json` | Projets vidéo/photo (YouTube embeds) |
| `tech.json` | Compétences tech (carousel dans Header ou autre) |

Modifier ces fichiers suffit pour mettre à jour le contenu, sans toucher aux composants.

**Attention** : pour `experiences.json` et `formation.json`, le texte affiché vient **toujours** des locales (`experiences.<id>.title` / `.description` / `.period` / `.short`). Le JSON ne porte que la structure :

| Champ | Utilisé par | Rôle |
|---|---|---|
| `id`, `logo` | `Timeline` | clé de traduction et logo rond |
| `period` | (aucun) | mémo lisible ; l'affichage passe par la locale |
| `nature` | `ParallelTimeline` | surtitre en petites majuscules sur la barre, clé de `journey.nature.*` (`cursus`, `exchange`, `internship`, `freelance`, `permanent`) |
| `start`, `end` | `ParallelTimeline` | `"AAAA-MM"`, **borne de fin exclusive** (le mois qui suit le dernier mois actif). Sans ces champs, l'entrée n'apparaît pas dans la frise |
| `ongoing` | `ParallelTimeline` | flèche « → » + dégradé de fuite : l'activité se poursuit au-delà de la frise |
| `integratedIn` | `ParallelTimeline` | *(experiences.json)* id du cursus : le stage passe dans la voie **Formation**, sous-groupe « Stages intégrés au cursus », au lieu de la voie Expérience |
| `track` | `ParallelTimeline`, `src/data/journey.ts` | *(experiences.json)* `"projects"` : l'entrée rejoint la voie **Projets** de la frise et la grille du chapitre « Mes projets » de l'accueil |
| `nature: "project"` | `src/data/journey.ts` | l'entrée est un projet, pas un poste : elle sort de la timeline des expériences pour n'être racontée que dans le chapitre « Mes projets ». Une carte de projet a en plus les clés `kind` et `card` |
| `url` | `PhotoProjects` | lien externe affiché en pied de carte projet |
| `roles[]` | `ParallelTimeline` | *(associations.json)* un objet `{ role, start, end }` par année scolaire. La frise dessine un segment par mandat, coupé à chaque rentrée de septembre, et affiche le rôle dessus. `role` est une clé de `associative.roles.*` |
| `exchanges[]` | `Timeline` + `ParallelTimeline` | *(formation.json)* échanges menés **pendant** ce cursus : sous-branche dans la timeline, segment bleu vif à l'intérieur de la barre dans la frise |

Ajouter une entrée = 1 bloc dans le JSON + les clés `title`, `description`, `period`, `short` dans `fr/common.json` **et** `en/common.json`.

Le parcours associatif suit le même principe : la liste `ASSOS` en tête de `src/pages/associativeCareer.tsx` décrit les trois engagements (logo, blocs, rôles, liens) et alimente à la fois le sommaire et les chapitres.

`projects.json` et `tech.json` ne sont importés par aucun composant à ce jour. `tech.json` liste encore des compétences blockchain qui ne correspondent à rien de réel : à nettoyer ou supprimer.

---

## Composants : conventions

- Tous les composants sont en `.tsx` dans `src/components/` ; le socle de la DA est dans `src/components/ui/`
- Chargement dynamique (`next/dynamic`) pour tout ce qui est sous la ligne de flottaison, mais **jamais pour le héros**, qui est le LCP de la page
- Les images utilisent toujours `next/image` avec `fill` ou `width/height`, un `sizes` quand `fill` est utilisé, et un `alt` renseigné (`alt=""` pour une image purement décorative)
- `quality` ne peut prendre qu'une valeur déclarée dans `images.qualities` de `next.config.mjs` (75, 80, 85, 90). Toute autre valeur fait planter le rendu
- Les intégrations tierces (YouTube) se chargent au clic, jamais au chargement de la page
- Les liens externes ont systématiquement `target="_blank" rel="noopener noreferrer"`
- Les icônes SVG inline ont `aria-hidden="true"` ; les liens icône-only ont un `aria-label`

---

## Direction artistique

DA « éditorial bleu nuit ». Trois règles portent tout le reste.

### 1. Trois surfaces, jamais plus

| Ton | Classe | Usage |
|---|---|---|
| `paper` | `bg-base-100` (`#ffffff`) | fond par défaut |
| `mist` | `bg-base-200` (`#f4f6fa`) | section alternée, panneaux |
| `ink` | `bg-secondary` (`#0f172a`) | bandeaux forts, footer, voiles photo |

`base-300` (`#e3e8f0`) sert aux filets et bordures. **Aucune couleur de fond en dur** (`bg-white`, `bg-gray-100`, `bg-[#0c0c0c]`) : passer par les tons.

### 2. Deux familles chromatiques

- **Bleu = académique.** `primary` `#1e3a8a` (cursus, actions principales), `accent` `#3b82f6` (échanges internationaux, numéros de chapitre, filets).
- **Ambre = professionnel.** `amber-600/100` pour les expériences salariées dans la frise.
- **Teal = mes projets.** `teal-600/100` pour la voie Projets, ce que je construis pour mon compte.
- **Violet = engagement associatif.** `violet-600/100` pour la voie Associatif.
- **Encre = structure.** `secondary` `#0f172a` pour le texte (`base-content`), les surfaces sombres et le repère « aujourd'hui ».

### 3. Chapitres numérotés

Chaque page se lit comme un sommaire : `01`, `02`, `03`… Le numéro apparaît dans le `SectionHeading`, dans le sommaire de l'accueil et dans les cartes du parcours associatif.

### Primitives : à utiliser, pas à recomposer

```tsx
import { Section, SectionHeading, PageHero, actionClasses, fadeUp, stagger, EASE, VIEWPORT } from '~~/src/components/ui';

<Section id="parcours" tone="mist" size="lg">
  <SectionHeading index="01" eyebrow="Parcours" icon={<Icon className="h-4 w-4" />}
                  title={t('journey.title')} lead={t('journey.subtitle')} />
  …
</Section>
```

| Primitive | Rôle |
|---|---|
| `<Section>` | surface (`tone`), rythme vertical (`size`), container, `scroll-mt` sous le header, apparition au scroll. `contained={false}` pour un contenu pleine largeur |
| `<Container>` | colonne `max-w-5xl px-5 sm:px-8`, même gouttière partout |
| `<SectionHeading>` | numéro + surtitre + titre + chapô, décliné clair/`ink` via `tone` |
| `<PageHero>` | héros de page intérieure : photo, voile encre, titre animé mot à mot |
| `actionClasses(variant, tone, size, extra)` | `solid` \| `outline` \| `quiet` × `light` \| `dark` × `md` \| `sm`. **Tous** les boutons du site en viennent |
| `motion.ts` | `EASE`, `VIEWPORT`, `fadeUp`, `fadeIn`, `stagger` : une seule courbe, un seul seuil |

### Rayons

`rounded-full` (boutons, pastilles, avatars) · `rounded-2xl` (cartes, panneaux, médias) · `rounded-xl` (blocs internes, tuiles d'icône ≥ 44 px) · `rounded-lg` (tuiles < 44 px) · `rounded-md` / `rounded` (barres et pastilles de la frise) · `rounded-sm` (tirages fine art, volontairement anguleux).

### Header

Sa hauteur est la variable CSS `--header-h` (`3.5rem`), lue par `scroll-padding-top` sur `html` et par le `scroll-mt` des sections. Changer la hauteur du header = changer cette seule variable.

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
- `images_original_backup/` (backup de 243 Mo, supprimé)
- Fichiers `.env` ou secrets

---

## Pages et navigation

Chaque page suit la même partition : héros → chapitres numérotés → footer.

| Route | Chapitres | Ancres |
|---|---|---|
| `/` | héros + sommaire → **01** Parcours → **02** Mes projets → **03** Vie associative | `#parcours`, `#projets`, `#associatif` |
| `/prestation` | héros → **01** Ce que je fais → **02** Le site de prestations | `#prestations`, `#devis` |
| `/associativeCareer` | héros → sommaire → **01** ISEP Live → **02** Vizion BDE → **03** ISEP Drone | `#engagements`, `#iseplive`, `#vizion`, `#isepdrone` |

Le chapitre **01 Parcours** de l'accueil enchaîne la frise (vue d'ensemble) puis `JourneyDetail`, deux onglets qui posent Formation et Expérience au même endroit. Les ancres historiques `#education` et `#experience` restent valides : elles sélectionnent l'onglet correspondant.

Le chapitre **02 Mes projets** présente l'activité indépendante : les projets menés à côté (refonte **Seed4Soft**, produit web **ReLive**, boutique **Benevolence**, prestations photo et vidéo). Chaque carte porte son propre lien sortant, le chapitre n'a donc pas de porte de sortie supplémentaire. C'est par la carte « Photo & vidéo » que les visiteurs intéressés rejoignent le site de prestations.

La page `/prestation` tient le même rôle côté navigation : trois familles de prestations en une ligne chacune (`OFFERS` en tête de fichier), puis un bandeau encre qui renvoie vers prestation.benevolence.fr. Elle ne liste ni tarifs ni réalisations : dès qu'un détail y apparaît, il diverge de sa source.

Le chapitre **03 Vie associative** nomme les trois engagements et renvoie à leur page. Chaque chapitre de l'accueil se termine ainsi sur une seule porte de sortie.

Dans la frise, la voie **Associatif** ne dessine pas une barre continue par association mais **un segment par année scolaire**, coupé à chaque rentrée de septembre, portant le rôle tenu cette année-là. Les segments d'un même engagement restent groupés sur une ligne : c'est le rôle de `packGroupedLanes`, distinct de `packLanes` utilisé par les autres voies.

Les mandats listés sur `/associativeCareer` lisent **le même `associations.json`** via le helper `rolesOf()` de la page. Ne jamais les recopier en dur : c'est ce qui avait fait diverger la frise et la page.

La nav du header est gérée dans `src/components/Header.tsx` via `menuLinks` (tableau exporté). « Contact » scrolle vers le footer.

---

## SEO

- `src/components/MetaHeader.tsx` : meta title, description, og:image par page
- `public/sitemap.xml` : sitemap statique (à mettre à jour manuellement si nouvelle page)
- `public/robots.txt` : autorisation crawl complet

---

## Points d'attention pour les agents

- **Pages Router uniquement** : ne pas migrer vers App Router sans décision explicite
- **Pas de base de données** : tout le contenu est dans les JSON de `public/assets/data/`
- **i18n obligatoire** : toute chaîne visible par l'utilisateur passe par `t('key')`
- **Jamais de tiret en milieu de phrase** : ni cadratin (`—`), ni demi-cadratin (`–`), nulle part. Ni dans la copie du site, ni dans les titres, les périodes, les commentaires de code ou cette documentation. Utiliser une virgule, deux-points, une parenthèse, ou couper la phrase. Les ranges de dates s'écrivent « Septembre 2024 à janvier 2025 », les séparateurs de `meta.title` utilisent `·`. Les traits d'union à l'intérieur d'un mot (auto-entrepreneur, vice-président) restent bien sûr valides
- **Images** : utiliser `next/image`, ne jamais utiliser `<img>` HTML natif
- **Jamais `overflow-x-hidden` sur un conteneur de page** : le CSS force alors `overflow-y` à `auto`, ce qui crée un conteneur de défilement imbriqué et bloque le scroll au trackpad. Utiliser `overflow-x-clip`, qui rogne sans créer de scroller. Même logique pour un défileur horizontal : lui ajouter `overflow-y-hidden`
- **Tailwind only** : pas de CSS modules, pas de styled-components
- **Passer par les primitives** : une nouvelle section = `<Section>` + `<SectionHeading>`, un nouveau bouton = `actionClasses()`. Ne pas recomposer un titre ou un bouton à la main : c'est ce qui avait fait diverger le site
- **Ne pas écrire de couleur en dur** : les trois tons (`base-100` / `base-200` / `secondary`) et les deux familles chromatiques couvrent tous les cas
- **Attention aux conflits d'utilitaires Tailwind** : `w-full` et `w-40` appartiennent au même groupe : c'est l'ordre dans le CSS généré qui tranche, pas l'ordre dans `className`. Ne pas mettre deux classes du même groupe sur un élément
- **DaisyUI** : utiliser les classes DaisyUI avant d'inventer des classes custom
- **TypeScript strict** : `ignoreBuildErrors: false`, toujours typer correctement
- **Yarn** : ne pas utiliser npm ou pnpm

---

## Skills actifs

- **ui-ux-pro-max** ([nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)) : Design intelligence : 67 styles UI, 161 palettes, 57 font pairings. Utiliser pour toute modification visuelle ou création de nouveau composant.
- **frontend-design** : Interfaces frontend production-grade, éviter les esthétiques génériques AI.
- **simplify** : Revue de code après modifications importantes.

---

## Ressources externes

- Prestations photo et vidéo : [prestation.benevolence.fr](https://prestation.benevolence.fr) (dépôt local `~/Benevolence-presta`). `/portfolio` de ce site-ci y redirige en 308, et la page `/prestation` y renvoie
- Portfolio photo : [portfolio.benevolence.fr](https://portfolio.benevolence.fr) (l'ancienne adresse `benjaminbalayre.myportfolio.com` y redirige)
- Boutique fine art : [benevolence.fr](https://benevolence.fr)
- Site en production : [benjamin.balayre.com](https://benjamin.balayre.com)
