import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Logo {
  src: string;
  alt: string;
}

interface Skill {
  id?: string;
  title: string;
  logos: Logo[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
  imageDescription: string;
}

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);
  const shine   = useTransform(springX, [-0.5, 0.5], ['linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)', 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 100%)']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) - 0.5);
    y.set(((e.clientY - rect.top)  / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2 } }}
      className="card bg-base-100 shadow-lg hover:shadow-2xl h-full rounded-xl relative overflow-hidden"
    >
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-xl"
        style={{ background: shine }}
      />

      <div className="card-body relative z-20" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="card-title text-xl sm:text-2xl md:text-3xl justify-center">{skill.title}</h3>
        <div className="flex flex-wrap justify-center gap-4 my-6">
          {skill.logos.map((logo, logoIndex) => (
            <div key={logoIndex} className="w-1/3 sm:w-1/4">
              <Image
                className="rounded-xl"
                src={logo.src}
                alt={logo.alt}
                width={64}
                height={64}
              />
            </div>
          ))}
        </div>
        <p className="text-base sm:text-lg text-center">{skill.description}</p>
        <div className="my-6">
          <Image
            className="rounded-xl"
            src={skill.image.src}
            alt={skill.image.alt}
            width={640}
            height={360}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ width: '100%', height: 'auto' }}
            data-cursor="view"
          />
        </div>
        <p className="text-center italic">{skill.imageDescription}</p>
      </div>
    </motion.div>
  );
};

export default SkillCard;
