import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation, Trans } from 'next-i18next';
import { motion } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';

import { Section, SectionHeading } from '~~/src/components/ui';

const VIDEO_ID = 'srY_viZ0XCA';
const EMBED = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;
const POSTER = '/assets/images/portfolio/Norway/image1.jpg';

/**
 * Dernier film. La vidéo n'est chargée qu'au clic : la page ne tire ni le
 * lecteur YouTube ni ses cookies tant que le visiteur ne l'a pas demandé.
 */
const LatestProject = () => {
  const { t } = useTranslation('common');
  const [playing, setPlaying] = useState(false);

  return (
    <Section id="film" tone="ink" size="lg">
      <SectionHeading
        index="01"
        eyebrow={t('portfolio.chapter.film')}
        tone="ink"
        title={t('home.latest_project_title')}
        lead={
          <Trans i18nKey="home.latest_project_desc">
            Durant mon échange universitaire à Oslo, j&apos;ai passé{' '}
            <span className="font-semibold text-white">4 mois en Norvège</span>. Cette vidéo
            retrace les moments forts et les paysages marquants de cette expérience.
          </Trans>
        }
      />

      <motion.div
        className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={EMBED}
            title={t('home.latest_project_title')}
            style={{ border: 0 }}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={t('portfolio.play_video')}
          >
            <Image
              src={POSTER}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-secondary/40 transition-colors duration-300 group-hover:bg-secondary/25" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-110">
                <PlayIcon className="ml-1 h-8 w-8 text-white" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </motion.div>
    </Section>
  );
};

export default LatestProject;
