import React from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import {
  ArrowUpRightIcon,
  CameraIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import { EASE } from '~~/src/components/ui';
import type { JourneyItem } from '~~/src/data/journey';

const ICONS: Record<string, typeof CameraIcon> = {
  relive: MagnifyingGlassIcon,
  benevolence: ShoppingBagIcon,
  freelance: CameraIcon,
};

/** `https://benevolence.fr` → `benevolence.fr` */
const hostOf = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/**
 * Les trois activités image, présentées côte à côte. Elles lisent la même
 * source que la frise : ajouter un projet dans `experiences.json` avec
 * `track: "projects"` le fait apparaître aux deux endroits.
 */
const PhotoProjects = ({ projects }: { projects: JourneyItem[] }) => {
  const { t } = useTranslation('common');

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {projects.map((project, i) => {
        const Icon = ICONS[project.id] ?? SparklesIcon;
        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
            viewport={{ once: true, margin: '-40px' }}
            className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="pt-1 text-right text-[11px] font-semibold text-base-content/45">
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
                className="group mt-5 inline-flex items-center gap-1.5 self-start border-t border-base-200 pt-4 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
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

export default PhotoProjects;
