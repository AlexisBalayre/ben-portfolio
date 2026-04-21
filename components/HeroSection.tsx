import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const SHOWREEL_URL = 'https://www.youtube.com/watch?v=n2BdqbzDTrM';

const SplitText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + wi * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const { t } = useTranslation('common');

  return (
    <div className="hero min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/portfolio/Japon/image1.jpg"
          alt="Hero background"
          fill
          style={{ objectFit: 'cover' }}
          quality={85}
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10" />

      {/* Content */}
      <div className="hero-content text-center text-neutral-content flex justify-center items-center flex-col z-20 relative px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
            <SplitText text={t('hero.title')} />
          </h1>
          <motion.p
            className="mb-8 text-white/80 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <a
              href={SHOWREEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 border-2 border-white text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:bg-black/10 transition-colors duration-300">
                <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {t('hero.showreel_button')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
