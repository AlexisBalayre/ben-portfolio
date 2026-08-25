import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { EASE } from '~~/src/components/ui';

interface ExploreCardProps {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  priority?: boolean;
}

/**
 * Carte de chapitre vers une page interne. Les deux portes de sortie de
 * l'accueil — portfolio et parcours associatif — partagent la même forme,
 * là où elles étaient auparavant traitées avec deux mises en page différentes.
 */
const ExploreCard = ({
  href,
  image,
  eyebrow,
  title,
  description,
  cta,
  priority = false,
}: ExploreCardProps) => (
  <motion.article
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4, ease: EASE }}
    className="group relative isolate overflow-hidden rounded-2xl bg-secondary shadow-lg"
  >
    <Link href={href} scroll={false} className="block focus-visible:outline-none">
      <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/10" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <span className="text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              {eyebrow}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            {description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
            {cta}
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default ExploreCard;
