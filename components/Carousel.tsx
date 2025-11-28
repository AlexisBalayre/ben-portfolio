import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Carousel = () => {
  const { t } = useTranslation('common');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
  ];

  // Auto-play avec pause au survol
  useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isHovered, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full py-16 section-avec-trait">
      {/* 🔥 Conteneur commun comme dans LatestProject */}
      <div
        className="group max-w-5xl mx-auto text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Titre + trait */}
        <div className="mb-10">
          <h2
            className="
              text-3xl font-bold tracking-wide 
              text-base-content/80 
              transition-all duration-500 
              group-hover:text-base-content group-hover:opacity-100 
              group-hover:-translate-y-1
            "
          >
            {t('home.carousel_title')}
          </h2>
          <hr className="trait mx-auto" />
        </div>

        {/* Carrousel */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_25px_70px_rgba(0,255,255,0.25),0_20px_60px_rgba(128,0,255,0.20)] transition-transform duration-500 group-hover:scale-[1.01]">
          <div className="relative aspect-[16/9]">
            <Image
              key={slides[currentSlide].src}
              src={slides[currentSlide].src}
              alt={slides[currentSlide].label}
              fill
              className="object-cover transition-opacity duration-700 ease-out"
              priority
            />

            {/* Dégradé + label du pays */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 py-4 flex items-end justify-between text-white">
              <span className="text-lg font-semibold tracking-wide">
                {slides[currentSlide].label}
              </span>
            </div>

            {/* Boutons de navigation */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
              <button
                onClick={handlePrevSlide}
                className="btn btn-circle bg-black/50 border-none text-white hover:bg-black/80"
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button
                onClick={handleNextSlide}
                className="btn btn-circle bg-black/50 border-none text-white hover:bg-black/80"
                aria-label="Next slide"
              >
                ❯
              </button>
            </div>

            {/* Indicateurs (petits points) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-4 bg-white'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;