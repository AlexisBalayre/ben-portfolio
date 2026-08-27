import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE } from './motion';

/**
 * Titre animé mot à mot. Les mots sont séparés par de **vrais espaces**, pas
 * par des marges : le titre s'extrait correctement du HTML, sans quoi il se
 * lit « ParcoursAssociatif ». C'est ce qui permet de n'écrire le titre qu'une
 * fois. Il était auparavant rendu deux fois, une version lisible doublée d'une
 * version animée masquée, et les moteurs qui n'exécutent pas de JavaScript,
 * dont la plupart des robots d'IA, lisaient le tout collé et en double.
 */
const SplitText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </>
  );
};

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: string;
  lead: string;
  scrollLabel?: string;
  children?: React.ReactNode;
}

/**
 * Héros de page intérieure. Portfolio et parcours associatif partagent
 * exactement la même ouverture : photo pleine page, voile encre, surtitre,
 * titre animé mot à mot, chapô, puis une action facultative.
 */
export const PageHero = ({ image, eyebrow, title, lead, scrollLabel, children }: PageHeroProps) => (
  <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden">
    <Image
      src={image}
      alt=""
      fill
      sizes="100vw"
      quality={85}
      priority
      style={{ objectFit: 'cover' }}
    />
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/50 to-secondary/90" />

    <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
      <motion.p
        className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-eyebrow text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </motion.p>

      <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        <SplitText text={title} />
      </h1>

      <motion.p
        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        {lead}
      </motion.p>

      {children && (
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          {children}
        </motion.div>
      )}
    </div>

    <motion.div
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <span className="text-[10px] uppercase tracking-eyebrow text-white/50">{scrollLabel ?? 'Scroll'}</span>
      <motion.span
        className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent"
        animate={{ scaleY: [0, 1, 0], originY: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  </section>
);

export default PageHero;
