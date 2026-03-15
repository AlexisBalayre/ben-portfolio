import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const prints = [
  { src: '/assets/images/portfolio/Norway/image1.jpg', label: 'Norway' },
  { src: '/assets/images/portfolio/Japon/image1.jpg', label: 'Japan' },
  { src: '/assets/images/portfolio/Iceland/image1.jpg', label: 'Iceland' },
];

const BenevolenceSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-16 md:gap-20">

        {/* Left — Content */}
        <div className="flex-1 flex flex-col items-start">
          <Image
            src="/assets/images/benevolence.png"
            alt="Benevolence"
            width={64}
            height={64}
            className="mb-8 rounded-xl"
          />

          <span className="text-neutral-500 text-xs tracking-[0.25em] uppercase mb-4">
            {t('benevolence.tagline')}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {t('benevolence.title')}
          </h2>

          <p className="text-neutral-600 text-lg leading-relaxed mb-10 max-w-sm">
            {t('benevolence.desc')}
          </p>

          <a
            href="https://benevolence.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-black border border-black/20 px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            {t('benevolence.button')}
            <ArrowUpRightIcon className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

        {/* Right — Staggered Print Gallery */}
        <div className="flex-1 relative h-[420px] w-full hidden md:block">

          {/* Print 1 — back left */}
          <motion.div
            whileHover={{ y: -6, rotate: -1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-0 left-0 w-[58%] aspect-[4/3] -rotate-3 overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
          >
            <Image
              src={prints[0].src}
              alt={prints[0].label}
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 ring-[1.5px] ring-black/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white/90 font-medium text-xs tracking-widest uppercase shadow-sm">
              {prints[0].label}
            </span>
          </motion.div>

          {/* Print 2 — center, on top */}
          <motion.div
            whileHover={{ y: -6, rotate: 0.5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-[80px] left-[25%] w-[58%] aspect-[4/3] rotate-2 overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-10"
          >
            <Image
              src={prints[1].src}
              alt={prints[1].label}
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 ring-[1.5px] ring-black/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white/90 font-medium text-xs tracking-widest uppercase shadow-sm">
              {prints[1].label}
            </span>
          </motion.div>

          {/* Print 3 — front right */}
          <motion.div
            whileHover={{ y: -6, rotate: -1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-[190px] right-0 w-[55%] aspect-[4/3] -rotate-1 overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-20"
          >
            <Image
              src={prints[2].src}
              alt={prints[2].label}
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 ring-[1.5px] ring-black/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white/90 font-medium text-xs tracking-widest uppercase shadow-sm">
              {prints[2].label}
            </span>
          </motion.div>
        </div>

        {/* Mobile — simple photo strip */}
        <div className="flex md:hidden gap-3 w-full overflow-x-auto pb-2">
          {prints.map((p) => (
            <div
              key={p.src}
              className="relative flex-shrink-0 w-[240px] aspect-[4/3] rounded-sm overflow-hidden shadow-xl"
            >
              <Image src={p.src} alt={p.label} fill className="object-cover" sizes="240px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white/90 font-medium text-xs tracking-widest uppercase shadow-sm">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenevolenceSection;
