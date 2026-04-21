import React from 'react';
import SkillCard from './SkillCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface Skill {
  id: string;
  title: string;
  logos: { src: string; alt: string; }[];
  description: string;
  image: { src: string; alt: string; };
  imageDescription: string;
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SkillsSection: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const { t } = useTranslation('common');

  return (
    <section className="py-12 sm:py-16 bg-gray-100 text-base-content px-4 sm:px-6 md:px-8 group section-avec-trait">
      <motion.div
        className="max-w-5xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-base-content/80 transition-all duration-500 group-hover:text-base-content group-hover:opacity-100 group-hover:-translate-y-1">
          {t('home.skills_title')}
        </h2>
        <hr className="trait mx-auto" aria-hidden="true" />
        <p className="mt-4 text-sm md:text-base text-base-content/70">
          {t('home.skills_desc')}
        </p>
      </motion.div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <SkillCard
              skill={{
                ...skill,
                title: t(`skills.${skill.id}.title`),
                description: t(`skills.${skill.id}.description`),
                imageDescription: t(`skills.${skill.id}.imageDescription`),
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
