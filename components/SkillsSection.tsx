import React from 'react';
import SkillCard from './SkillCard';

interface Skill {
  title: string;
  logos: {
    src: string;
    alt: string;
  }[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
  imageDescription: string;
}

const SkillsSection: React.FC<{ skills: Skill[] }> = ({ skills }) => (
  <section className="py-12 bg-neutral-content text-base-content px-2">
    <div className="text-center">
      <h2 className="text-4xl font-bold">Compétences</h2>
      <hr className="trait" />
    </div>
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-12">
      {skills.map((skill, index) => (
        <div
          key={index}
        
        >
          <SkillCard skill={skill} />
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;