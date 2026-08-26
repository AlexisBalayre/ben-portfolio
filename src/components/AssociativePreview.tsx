import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { EASE, Section, SectionHeading, VIEWPORT, actionClasses } from '~~/src/components/ui';
import type { JourneyItem } from '~~/src/data/journey';

/**
 * Aperçu du parcours associatif sur l'accueil. Les trois engagements sont
 * nommés ici ; le détail vit sur sa page.
 */
const AssociativePreview = ({ associations }: { associations: JourneyItem[] }) => {
  const { t } = useTranslation('common');

  return (
    <Section id="associatif" tone="mist" size="lg" reveal={false}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        viewport={VIEWPORT}
        className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16"
      >
        <div>
          <SectionHeading
            index="03"
            eyebrow={t('home.chapter.associative')}
            title={t('home.associative_preview_title')}
            lead={t('home.associative_preview_desc')}
          />

          <ul className="mt-10 divide-y divide-base-300 border-y border-base-300">
            {associations.map((asso) => (
              <li key={asso.id} className="flex items-center gap-4 py-4">
                <Image
                  src={`/assets/images/${asso.logo}`}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{t(`associative.${asso.id}.short`)}</p>
                  <p className="text-sm text-base-content/60">{t(`associative.${asso.id}.role`)}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-base-content/40">
                  {t(`associative.${asso.id}.period`)}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/associativeCareer" scroll={false} className={actionClasses('solid', 'light', 'md', 'mt-10')}>
            {t('home.associative_preview_button')}
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg sm:aspect-[16/10] lg:aspect-[4/5]">
          <Image
            src="/assets/images/portfolio/asso2.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-secondary/35 to-transparent" />
        </div>
      </motion.div>
    </Section>
  );
};

export default AssociativePreview;
