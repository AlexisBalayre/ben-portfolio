import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 500, mass: 0.2 };
  const dotSpringX = useSpring(dotX, dotSpringConfig);
  const dotSpringY = useSpring(dotY, dotSpringConfig);

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view' | 'hidden'>('default');

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleEnterLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isImage = target.closest('[data-cursor="view"]');
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label');
      if (isImage) setCursorState('view');
      else if (isInteractive) setCursorState('hover');
    };

    const handleLeaveLink = () => setCursorState('default');
    const handleLeave = () => setCursorState('hidden');
    const handleEnter = () => setCursorState('default');

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleEnterLink);
    document.addEventListener('mouseout', handleLeaveLink);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleEnterLink);
      document.removeEventListener('mouseout', handleLeaveLink);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  const ringVariants = {
    default: { scale: 1, opacity: 1, backgroundColor: 'transparent', border: '1.5px solid rgba(30,58,138,0.6)' },
    hover:   { scale: 1.6, opacity: 0.8, backgroundColor: 'rgba(30,58,138,0.12)', border: '1.5px solid rgba(30,58,138,0.8)' },
    view:    { scale: 3.5, opacity: 0.9, backgroundColor: 'rgba(30,58,138,0.15)', border: '1.5px solid rgba(30,58,138,0.6)' },
    hidden:  { scale: 0, opacity: 0, backgroundColor: 'transparent', border: '1.5px solid transparent' },
  };

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{ x: springX, y: springY }}
        animate={cursorState}
        variants={ringVariants}
        transition={{ duration: 0.2 }}
      >
        {cursorState === 'view' && (
          <span className="text-primary text-[9px] font-bold tracking-widest uppercase select-none">
            View
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ x: dotSpringX, y: dotSpringY }}
        animate={{
          scale: cursorState === 'hover' ? 0 : cursorState === 'hidden' ? 0 : 1,
          opacity: cursorState === 'hidden' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
