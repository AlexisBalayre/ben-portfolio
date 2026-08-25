import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

/**
 * Bandeau défilant des photos de voyage. Le composant ne porte que le
 * défilement : le titre et le chapô viennent de la section qui l'accueille.
 */
const Carousel = () => {
  const { t } = useTranslation('common');

  const slides = [
    { src: '/assets/images/portfolio/Egypte/image2.jpg', label: t('home.countries.egypt') },
    { src: '/assets/images/portfolio/Indonesie/image1.jpg', label: t('home.countries.indonesia') },
    { src: '/assets/images/portfolio/Japon/image1.jpg', label: t('home.countries.japan') },
    { src: '/assets/images/portfolio/Bresil/image1.jpg', label: t('home.countries.brazil') },
    { src: '/assets/images/portfolio/Iceland/image1.jpg', label: t('home.countries.iceland') },
    { src: '/assets/images/portfolio/Norway/image1.jpg', label: t('home.countries.norway') },
    { src: '/assets/images/portfolio/Egypte/image1.jpeg', label: t('home.countries.egypt') },
    { src: '/assets/images/portfolio/Egypte/image4.JPG', label: t('home.countries.egypt') },
    { src: '/assets/images/portfolio/Indonesie/image5.JPG', label: t('home.countries.indonesia') },
  ];

  // Piste dupliquée : l'animation translate de -50 %, la boucle est donc invisible.
  const track = [...slides, ...slides];

  return (
    <div className="relative w-full overflow-x-clip" aria-label={t('home.carousel_title')}>
      {/* Fondus latéraux : la piste entre et sort du cadre au lieu d'être coupée. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-base-100 to-transparent sm:w-20 md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-base-100 to-transparent sm:w-20 md:w-32" />

      <div className="flex w-max animate-scroll">
        {track.map((slide, index) => (
          <figure
            key={`${slide.src}-${index}`}
            className="group relative mx-2 h-[175px] w-[260px] flex-shrink-0 overflow-hidden rounded-2xl shadow-md sm:h-[215px] sm:w-[320px] md:mx-3 md:h-[260px] md:w-[400px]"
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 400px"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-secondary/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-semibold uppercase tracking-eyebrow text-white">
                {slide.label}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
