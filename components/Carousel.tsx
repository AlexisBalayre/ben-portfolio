import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Carousel = () => {
  const { t } = useTranslation('common');

  const slides = [
    {
      src: '/assets/images/portfolio/Egypte/image2.jpg',
      label: t('home.countries.egypt'),
    },
    {
      src: '/assets/images/portfolio/Indonesie/image1.jpg',
      label: t('home.countries.indonesia'),
    },
    {
      src: '/assets/images/portfolio/Japon/image1.jpg',
      label: t('home.countries.japan'),
    },
    {
      src: '/assets/images/portfolio/Bresil/image1.jpg',
      label: t('home.countries.brazil'),
    },
    {
      src: '/assets/images/portfolio/Iceland/image1.jpg',
      label: t('home.countries.iceland'),
    },
    {
      src: '/assets/images/portfolio/Norway/image1.jpg',
      label: t('home.countries.norway'),
    },
    // Adding more images from the assets if available or reusing for variety
    {
        src: '/assets/images/portfolio/Egypte/image1.jpeg',
        label: t('home.countries.egypt'),
    },
    {
        src: '/assets/images/portfolio/Egypte/image4.JPG',
        label: t('home.countries.egypt'),
    },
    {
       src: '/assets/images/portfolio/Indonesie/image5.JPG',
       label: t('home.countries.indonesia'),
    },
  ];

  // We duplicate the slides to create the infinite seamless effect
  // Tripling it ensures there's always enough content even on wide screens
  const marqueeSlides = [...slides, ...slides, ...slides];

  return (
    <section className="w-full py-16 section-avec-trait overflow-hidden bg-base-100">
      <div className="group max-w-full mx-auto text-center">
        {/* Titre + trait */}
        <div className="mb-10 px-4">
          <h2
            className="
              text-3xl font-bold tracking-wide 
              text-base-content/80 
              transition-all duration-500 
              hover:text-base-content
            "
          >
            {t('home.carousel_title')}
          </h2>
          <hr className="trait mx-auto" />
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Fading Edges for better assimilation */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-base-100 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-base-100 to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex w-max animate-scroll hover:pause">
            {marqueeSlides.map((slide, index) => (
              <div 
                key={`${slide.src}-${index}`} 
                className="relative flex-shrink-0 w-[300px] h-[200px] md:w-[400px] md:h-[260px] mx-2 md:mx-4 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300"
              >
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 300px, 400px"
                />
                
                {/* Overlay with subtle label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium tracking-wide">
                    {slide.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;