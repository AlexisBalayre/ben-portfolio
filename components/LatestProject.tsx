import React from 'react';
import { useTranslation, Trans } from 'next-i18next';

const LatestProject = () => {
  const { t } = useTranslation('common');

  return (
    <section className="w-full bg-base-content py-14 px-6 md:px-16 group section-avec-trait">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 md:gap-12">
        {/* Description — Centered on top */}
        <div className="w-full text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-base-100/80 transition-all duration-500 group-hover:text-base-100 group-hover:-translate-y-1 mb-2">
            {t('home.latest_project_title')}
          </h2>
          <hr className="trait mt-3 mb-6 mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <p className="text-base-100/70 text-lg leading-relaxed max-w-2xl">
            <Trans i18nKey="home.latest_project_desc">
              Durant mon échange universitaire à Oslo, j&apos;ai passé{' '}
              <span className="font-semibold text-base-100">4 mois en Norvège</span>.
              Cette vidéo retrace les moments forts et les paysages marquants de cette expérience.
            </Trans>
          </p>
        </div>

        {/* Video — Centered below */}
        <div className="w-full md:w-5/6 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/srY_viZ0XCA?si=nQ15o5oqppPmgq9H"
              title="Norway — 4 months in Norway (Benjamin Balayre)"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProject;
