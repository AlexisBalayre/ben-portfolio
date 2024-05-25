import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="hero min-h-screen bg-fixed relative">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          transition: 'transform 0.5s ease-out',
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      >
        <Image
          src="/assets/images/portfolio/Japon/image1.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          quality={80}
        />
      </div>
      <div className="hero-overlay bg-opacity-20 z-100 absolute w-full h-full"></div>
      <div className="hero-content text-center text-neutral-content flex justify-center items-center flex-col z-10">
        <div className="animate-fade-in-down max-w-lg">
          <h1 className="text-6xl font-bold mb-4">Portfolio</h1>
          <p className="mb-6">
            Welcome to my portfolio, a space dedicated to presenting my projects and galleries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;