import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import { SectionHeading, actionClasses } from '~~/src/components/ui';

/**
 * Renvoi vers le portfolio complet hébergé à l'extérieur. Bandeau pleine
 * largeur : c'est la respiration de la page, entre les cartes et la boutique.
 */
const Projects = () => {
  const { t } = useTranslation('common');

  return (
    <section
      id="galerie"
      className="relative flex w-full scroll-mt-[calc(var(--header-h)+1.5rem)] items-center justify-center overflow-hidden bg-secondary py-24 sm:py-28 md:py-32"
    >
      {/* Fond défilant, volontairement très assombri : il ne concurrence pas le texte. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex w-[200%] animate-scroll">
        {[0, 1].map((i) => (
          <div key={i} className="relative h-full w-1/2">
            <Image
              src="/assets/images/portfolio.png"
              alt=""
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
              className="brightness-[0.45]"
              quality={75}
            />
          </div>
        ))}
      </div>

      {/* Voile encre : le contraste du texte ne dépend pas de la photo qui passe dessous. */}
      <div aria-hidden="true" className="absolute inset-0 bg-secondary/70" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow={t('external_portfolio.title')}
          tone="ink"
          align="center"
          title={t('external_portfolio.description')}
        />
        <div className="mt-10 flex justify-center">
          <a
            href="https://benjaminbalayre.myportfolio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={actionClasses('solid', 'dark')}
          >
            {t('external_portfolio.button')}
            <ArrowUpRightIcon
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
