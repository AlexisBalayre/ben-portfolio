import type { Variants } from 'framer-motion';

/** Courbe unique du site — toute transition s'y réfère. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Réglage d'apparition partagé : une seule fois, déclenché avant l'entrée réelle. */
export const VIEWPORT = { once: true, margin: '-80px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
