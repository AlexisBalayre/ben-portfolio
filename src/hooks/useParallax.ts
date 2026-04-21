import { useEffect, useState } from 'react';

const useParallax = (factor = 0.5) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || window.scrollY;

      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(() => {
          setScrollPosition(currentScroll);
          animationFrameId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition * factor;
};

export default useParallax;
