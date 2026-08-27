import type { NextPage } from 'next';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import {
  ArrowUpRightIcon,
  CameraIcon,
  FilmIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import {
  PageHero,
  Section,
  SectionHeading,
  actionClasses,
  EASE,
} from '~~/src/components/ui';

const PRESTA_URL = 'https://prestation.benevolence.fr';

/**
 * Les trois familles de prestations, décrites ici en une ligne chacune. Le
 * detail (offres, tarifs, realisations) vit sur le site de prestations : cette
 * page pose le contexte et ouvre la porte, elle ne le duplique pas.
 */
const OFFERS = [
  { id: 'event', icon: CameraIcon },
  { id: 'brand', icon: FilmIcon },
  { id: 'portrait', icon: SparklesIcon },
];

const Prestation: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        image="/assets/images/portfolio/IL.jpg"
        eyebrow={t('prestation.eyebrow')}
        title={t('prestation.title')}
        lead={t('prestation.lead')}
        scrollLabel={t('prestation.scroll')}
      >
        <a
          href={PRESTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClasses('solid', 'dark')}
        >
          {t('prestation.cta')}
          <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </PageHero>

      {/* ── 01 Ce que je fais ─────────────────────────────────── */}
      <Section id="prestations" tone="paper" size="lg">
        <SectionHeading
          index="01"
          eyebrow={t('prestation.offers_eyebrow')}
          icon={<CameraIcon className="h-4 w-4" aria-hidden="true" />}
          title={t('prestation.offers_title')}
          lead={t('prestation.offers_lead')}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {OFFERS.map(({ id, icon: Icon }, i) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: '-40px' }}
              className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold">{t(`prestation.offers.${id}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                {t(`prestation.offers.${id}.desc`)}
              </p>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ── 02 Le site de prestations ─────────────────────────── */}
      <Section id="devis" tone="ink" size="lg">
        <SectionHeading
          index="02"
          eyebrow={t('prestation.cta_eyebrow')}
          title={t('prestation.cta_title')}
          lead={t('prestation.cta_lead')}
          tone="ink"
          align="center"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={PRESTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={actionClasses('solid', 'dark')}
          >
            {t('prestation.cta')}
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://portfolio.benevolence.fr"
            target="_blank"
            rel="noopener noreferrer"
            className={actionClasses('outline', 'dark')}
          >
            {t('home.quick_portfolio')}
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Section>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Prestation;
