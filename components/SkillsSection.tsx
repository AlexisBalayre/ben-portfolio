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
  <section className="py-16 bg-neutral-content text-base-content px-4 group section-avec-trait">
    <div className="max-w-5xl mx-auto text-center mb-10">
      <h2
        className="
          text-4xl font-bold tracking-wide 
          text-base-content/80 
          transition-all duration-500 
          group-hover:text-base-content group-hover:opacity-100 
          group-hover:-translate-y-1
        "
      >
        Compétences
      </h2>
      <hr className="trait mx-auto" />
      <p className="mt-4 text-sm md:text-base text-base-content/70">
        Voici un aperçu des outils et domaines avec lesquels je travaille au quotidien,
        entre data, création visuelle et produits numériques.
      </p>
    </div>

    <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="
            transform transition-all duration-500 
            hover:-translate-y-1 hover:scale-[1.01]
          "
        >
          <SkillCard skill={skill} />
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;