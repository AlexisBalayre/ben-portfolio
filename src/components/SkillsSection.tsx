import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

import SkillCard, { Skill } from './SkillCard';
import { EASE, Section, SectionHeading, VIEWPORT } from '~~/src/components/ui';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
  }),
};

const SkillsSection = ({ skills }: { skills: Skill[] }) => {
  const { t } = useTranslation('common');

  return (
    <Section id="savoir-faire" tone="paper" size="lg" reveal={false}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} viewport={VIEWPORT}>
        <SectionHeading
          index="02"
          eyebrow={t('portfolio.chapter.skills')}
          title={t('home.skills_title')}
          lead={t('home.skills_desc')}
        />
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id ?? index}
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
    </Section>
  );
};

export default SkillsSection;
