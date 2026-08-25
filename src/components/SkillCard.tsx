import React from 'react';
import Image from 'next/image';

export interface Skill {
  id?: string;
  title: string;
  logos: { src: string; alt: string }[];
  description: string;
  image: { src: string; alt: string };
  imageDescription: string;
}

/**
 * Carte de savoir-faire. Même géométrie que les autres cartes du site :
 * fond papier, coins 1rem, filet base-300, élévation au survol.
 */
const SkillCard = ({ skill }: { skill: Skill }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-base-200">
      <Image
        src={skill.image.src}
        alt={skill.image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>

    <div className="flex flex-1 flex-col p-6">
      <div className="mb-4 flex items-center gap-2">
        {skill.logos.map((logo) => (
          <span
            key={logo.src}
            className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-base-300 bg-base-100"
          >
            <Image src={logo.src} alt={logo.alt} width={22} height={22} className="object-contain" />
          </span>
        ))}
      </div>

      <h3 className="text-xl font-bold">{skill.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-base-content/65">{skill.description}</p>

      <p className="mt-5 border-t border-base-200 pt-4 text-xs text-base-content/45">
        {skill.imageDescription}
      </p>
    </div>
  </article>
);

export default SkillCard;
