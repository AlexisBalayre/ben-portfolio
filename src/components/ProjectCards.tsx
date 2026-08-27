import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import { EASE } from '~~/src/components/ui';
import type { JourneyItem } from '~~/src/data/journey';

/**
 * Le logo de chaque projet, détouré au plus près et exporté à 96 px de haut,
 * soit trois fois sa hauteur d'affichage. Les dimensions sont déclarées ici
 * parce qu'elles varient d'un logo à l'autre : la carte cale la hauteur et
 * laisse la largeur suivre, sans déformer aucune marque.
 */
const LOGOS: Record<string, { src: string; width: number; height: number }> = {
  seed4soft: { src: '/assets/images/projects/seed4soft.png', width: 487, height: 96 },
  relive: { src: '/assets/images/projects/relive.png', width: 96, height: 96 },
  benevolence: { src: '/assets/images/projects/benevolence.png', width: 124, height: 96 },
};

/** `https://benevolence.fr` → `benevolence.fr` */
const hostOf = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/**
 * Les projets menés en indépendant, présentés côte à côte. Ils lisent la même
 * source que la frise : ajouter une entrée dans `experiences.json` avec
 * `track: "projects"` la fait apparaître aux deux endroits.
 */
const ProjectCards = ({ projects }: { projects: JourneyItem[] }) => {
  const { t } = useTranslation('common');

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => {
        const logo = LOGOS[project.id];
        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
            viewport={{ once: true, margin: '-40px' }}
            className="group flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl"
          >
            {/* Le logo tient sur la ligne de la période : il signe la carte
                sans lui voler son titre. */}
            <div className="mb-5 flex h-7 items-center justify-between gap-3">
              {logo ? (
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  quality={90}
                  className="h-7 w-auto opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              ) : (
                <span />
              )}
              <span className="shrink-0 text-[11px] font-semibold text-base-content/45">
                {t(`experiences.${project.id}.period`)}
              </span>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              {t(`experiences.${project.id}.kind`)}
            </p>

            <h3 className="mt-1.5 text-xl font-bold">{t(`experiences.${project.id}.short`)}</h3>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-base-content/65">
              {t(`experiences.${project.id}.card`)}
            </p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 self-start border-t border-base-200 pt-4 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
              >
                {hostOf(project.url)}
                <ArrowUpRightIcon
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProjectCards;
