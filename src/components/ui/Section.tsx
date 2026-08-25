import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT } from './motion';

/** Les trois seules surfaces du site. */
export type Tone = 'paper' | 'mist' | 'ink';

type Size = 'sm' | 'md' | 'lg';

const TONE: Record<Tone, string> = {
  paper: 'bg-base-100 text-base-content',
  mist: 'bg-base-200 text-base-content',
  ink: 'bg-secondary text-white',
};

const SIZE: Record<Size, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20 md:py-24',
  lg: 'py-20 sm:py-28 md:py-32',
};

export const Container = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>;

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  size?: Size;
  /** false : la section ne pose que la surface, le contenu gère sa propre largeur. */
  contained?: boolean;
  /** false : pas d'apparition au scroll (héros, sections déjà animées). */
  reveal?: boolean;
  className?: string;
}

/**
 * Enveloppe de section : surface, rythme vertical, largeur de colonne et
 * apparition au scroll. Toutes les sections du site passent par ici, ce qui
 * garantit qu'aucune ne dérive sur son fond ou ses marges.
 */
export const Section = ({
  children,
  id,
  tone = 'paper',
  size = 'md',
  contained = true,
  reveal = true,
  className = '',
}: SectionProps) => {
  const body = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={`w-full scroll-mt-[calc(var(--header-h)+1.5rem)] ${TONE[tone]} ${SIZE[size]} ${className}`}
    >
      {reveal ? (
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          {body}
        </motion.div>
      ) : (
        body
      )}
    </section>
  );
};

export default Section;
