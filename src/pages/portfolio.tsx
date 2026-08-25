import type { NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { PlayIcon } from '@heroicons/react/24/solid';

import { PageHero, actionClasses } from '~~/src/components/ui';
import skills from '~~/public/assets/data/skills.json';

const SHOWREEL_URL = 'https://www.youtube.com/watch?v=n2BdqbzDTrM';

// Le héros est rendu tout de suite (c'est le LCP de la page) ; le reste suit.
const LatestProject = dynamic(() => import('~~/src/components/LatestProject'), {
  loading: () => <div className="h-96 animate-pulse bg-secondary" />,
});
const SkillsSection = dynamic(() => import('~~/src/components/SkillsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-base-100" />,
});
const Projects = dynamic(() => import('~~/src/components/Projects'), {
  loading: () => <div className="h-96 animate-pulse bg-secondary" />,
});
const BenevolenceSection = dynamic(() => import('~~/src/components/BenevolenceSection'), {
  loading: () => <div className="h-96 animate-pulse bg-base-200" />,
});

/**
 * Portfolio créatif — quatre chapitres numérotés, du dernier film réalisé
 * jusqu'à la boutique de tirages.
 */
const Portfolio: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        image="/assets/images/portfolio/Japon/image1.jpg"
        eyebrow={t('portfolio.chapter.hero')}
        title={t('hero.title')}
        lead={t('hero.subtitle')}
      >
        <a
          href={SHOWREEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClasses('outline', 'dark')}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-secondary/10">
            <PlayIcon className="ml-0.5 h-3 w-3" aria-hidden="true" />
          </span>
          {t('hero.showreel_button')}
        </a>
      </PageHero>

      <LatestProject />
      <SkillsSection skills={skills} />
      <Projects />
      <BenevolenceSection />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Portfolio;
