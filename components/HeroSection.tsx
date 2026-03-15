import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import useParallax from '~~/hooks/useParallax';

const HeroSection = () => {
  const { t } = useTranslation('common');
  const parallaxOffset = useParallax();

  return (
    <div className="hero min-h-screen relative overflow-hidden">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          willChange: 'transform',
        }}
      >
        <Image
          src="/assets/images/portfolio/Japon/image1.jpg"
          alt="Hero background"
          fill
          style={{ objectFit: 'cover' }}
          quality={80}
          priority
        />
      </div>

      <div className="hero-overlay bg-opacity-20 z-10 absolute inset-0" />

      <div className="hero-content text-center text-neutral-content flex justify-center items-center flex-col z-20 relative">
        <div className="animate-fade-in-down max-w-lg px-4">
          <h1 className="text-6xl font-bold mb-4 text-white">{t('hero.title')}</h1>
          <p className="mb-6 text-white">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
