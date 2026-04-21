import React, { useState } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';

const PREVIEW_EMBED = 'https://www.youtube.com/embed/Ume2bRWcUPc?autoplay=1&mute=1&loop=1&playlist=Ume2bRWcUPc&controls=0&showinfo=0&rel=0&modestbranding=1';
const MAIN_EMBED   = 'https://www.youtube.com/embed/srY_viZ0XCA?si=nQ15o5oqppPmgq9H';

const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const LatestProject = () => {
  const { t } = useTranslation('common');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.section
      className="w-full bg-base-content py-10 sm:py-12 md:py-14 px-4 sm:px-8 md:px-16 group section-avec-trait"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 md:gap-12">

        {/* Title + description */}
        <div className="w-full text-center flex flex-col items-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-base-100/80 transition-all duration-500 group-hover:text-base-100 group-hover:-translate-y-1 mb-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {t('home.latest_project_title')}
          </motion.h2>
          <hr className="trait mt-3 mb-6 mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }} aria-hidden="true" />
          <motion.p
            className="text-base-100/70 text-base sm:text-lg leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <Trans i18nKey="home.latest_project_desc">
              Durant mon échange universitaire à Oslo, j&apos;ai passé{' '}
              <span className="font-semibold text-base-100">4 mois en Norvège</span>.
              Cette vidéo retrace les moments forts et les paysages marquants de cette expérience.
            </Trans>
          </motion.p>
        </div>

        {/* Video container with hover preview */}
        <motion.div
          className="w-full md:w-5/6 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          data-cursor="view"
        >
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>

            {/* Main iframe */}
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src={MAIN_EMBED}
              title="Norway — 4 months in Norway (Benjamin Balayre)"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
            />

            {/* Preview overlay on hover (muted autoplay teaser) */}
            <AnimatePresence>
              {isHovering && !videoLoaded && (
                <motion.div
                  className="absolute inset-0 z-10 rounded-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <iframe
                    className="w-full h-full"
                    src={PREVIEW_EMBED}
                    title="Norway preview"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allow="autoplay; encrypted-media"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play button overlay */}
            <AnimatePresence>
              {!videoLoaded && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    animate={{ scale: isHovering ? 1.15 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlayIcon className="w-7 h-7 text-white ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LatestProject;
