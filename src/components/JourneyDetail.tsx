import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

import Timeline, { TimelineEntry } from '~~/src/components/Timeline';
import { EASE } from '~~/src/components/ui';

type TrackId = 'education' | 'experience';

interface JourneyDetailProps {
  education: TimelineEntry[];
  experiences: TimelineEntry[];
}

/**
 * Détail du parcours. La frise donne la vue d'ensemble ; ce bloc donne le
 * détail, formation et expérience sur le même emplacement plutôt qu'en deux
 * sections successives qui racontaient deux fois la même chronologie.
 */
const JourneyDetail = ({ education, experiences }: JourneyDetailProps) => {
  const { t } = useTranslation('common');
  const [track, setTrack] = useState<TrackId>('education');

  const tracks = [
    {
      id: 'education' as const,
      label: t('home.education_title'),
      lead: t('home.education_desc'),
      icon: <AcademicCapIcon className="h-4 w-4" aria-hidden="true" />,
      items: education,
      prefix: 'formation',
    },
    {
      id: 'experience' as const,
      label: t('home.experience_title'),
      lead: t('home.experience_desc'),
      icon: <BriefcaseIcon className="h-4 w-4" aria-hidden="true" />,
      items: experiences,
      prefix: 'experiences',
    },
  ];

  // Les ancres historiques #education et #experience continuent de fonctionner :
  // elles sélectionnent l'onglet correspondant au lieu de viser une section morte.
  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'education' || hash === 'experience') setTrack(hash);
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [syncFromHash]);

  const active = tracks.find((x) => x.id === track) ?? tracks[0];

  return (
    <div className="mt-14">
      <div
        role="tablist"
        aria-label={t('journey.tabs_aria')}
        className="inline-flex rounded-full border border-base-300 bg-base-100 p-1 shadow-sm"
      >
        {tracks.map(({ id, label, icon }) => {
          const isActive = id === track;
          return (
            <button
              key={id}
              role="tab"
              id={`journey-tab-${id}`}
              aria-selected={isActive}
              aria-controls="journey-panel"
              onClick={() => setTrack(id)}
              className={`relative inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200 sm:px-5 ${
                isActive ? 'text-white' : 'text-base-content/60 hover:text-base-content'
              }`}
            >
              {isActive && (
                <motion.span
                  aria-hidden="true"
                  layoutId="journey-tab-pill"
                  className="absolute inset-0 z-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{icon}</span>
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Cibles des ancres historiques, décalées sous le header fixe. */}
      <span id="education" className="block scroll-mt-[calc(var(--header-h)+6rem)]" />
      <span id="experience" className="block scroll-mt-[calc(var(--header-h)+6rem)]" />

      <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${track}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={track}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-base-content/65">
              {active.lead}
            </p>
            <Timeline items={active.items} translationPrefix={active.prefix} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JourneyDetail;
