import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import { EASE, Section, SectionHeading, VIEWPORT, actionClasses, fadeUp, stagger } from '~~/src/components/ui';

const PRINTS = [
  { src: '/assets/images/portfolio/Norway/image1.jpg', country: 'home.countries.norway', className: 'absolute left-0 top-0 w-[58%] -rotate-3' },
  { src: '/assets/images/portfolio/Japon/image1.jpg', country: 'home.countries.japan', className: 'absolute left-[25%] top-[80px] z-10 w-[58%] rotate-2' },
  { src: '/assets/images/portfolio/Iceland/image1.jpg', country: 'home.countries.iceland', className: 'absolute right-0 top-[190px] z-20 w-[55%] -rotate-1' },
];

const BenevolenceSection = () => {
  const { t } = useTranslation('common');

  return (
    <Section id="tirages" tone="mist" size="lg" reveal={false}>
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
        <motion.div
          className="flex-1"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.div variants={fadeUp}>
            <Image
              src="/assets/images/benevolence.png"
              alt="Benevolence"
              width={56}
              height={56}
              className="mb-8 rounded-xl"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading
              index="04"
              eyebrow={t('benevolence.tagline')}
              title={t('benevolence.title')}
              lead={t('benevolence.desc')}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9">
            <a
              href="https://benevolence.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={actionClasses('outline')}
            >
              {t('benevolence.button')}
              <ArrowUpRightIcon
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Pile de tirages — desktop */}
        <div className="relative hidden h-[420px] flex-1 md:block">
          {PRINTS.map((print, i) => (
            <motion.figure
              key={print.src}
              className={`${print.className} aspect-[4/3] overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(15,23,42,0.35)]`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
              viewport={{ once: true }}
              whileHover={{ y: -8, rotate: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
            >
              <Image src={print.src} alt={t(print.country)} fill className="object-cover" sizes="33vw" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-secondary/25 to-transparent ring-1 ring-inset ring-secondary/10" />
              <figcaption className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-eyebrow text-white/90">
                {t(print.country)}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Bande photo — mobile */}
        <div className="-mx-5 flex w-[calc(100%+2.5rem)] gap-3 overflow-x-auto overflow-y-hidden px-5 pb-2 md:hidden">
          {PRINTS.map((print) => (
            <figure
              key={print.src}
              className="relative aspect-[4/3] w-[min(80vw,300px)] flex-shrink-0 overflow-hidden rounded-sm shadow-lg"
            >
              <Image src={print.src} alt={t(print.country)} fill className="object-cover" sizes="80vw" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-secondary/25 to-transparent" />
              <figcaption className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-eyebrow text-white/90">
                {t(print.country)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BenevolenceSection;
