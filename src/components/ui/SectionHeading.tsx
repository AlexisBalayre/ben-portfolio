import React from 'react';
import type { Tone } from './Section';

interface SectionHeadingProps {
  /** Numéro de chapitre — c'est lui qui donne le fil de lecture de la page. */
  index?: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  title: string;
  lead?: React.ReactNode;
  tone?: Tone;
  align?: 'left' | 'center';
  className?: string;
}

const ON_INK = {
  rule: 'bg-white/25',
  eyebrow: 'text-white/60',
  index: 'text-accent',
  title: 'text-white',
  lead: 'text-white/60',
};

const ON_PAPER = {
  rule: 'bg-base-content/15',
  eyebrow: 'text-base-content/50',
  index: 'text-accent',
  title: 'text-base-content',
  lead: 'text-base-content/65',
};

/**
 * Titre de section unique du site : numéro de chapitre, surtitre, titre, chapô.
 * Les pages ne composent plus leurs titres à la main.
 */
export const SectionHeading = ({
  index,
  eyebrow,
  icon,
  title,
  lead,
  tone = 'paper',
  align = 'left',
  className = '',
}: SectionHeadingProps) => {
  const c = tone === 'ink' ? ON_INK : ON_PAPER;
  const centered = align === 'center';

  return (
    <header className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {(index || eyebrow) && (
        <div
          className={`mb-4 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
        >
          {index && (
            <span className={`text-xs font-bold tracking-eyebrow ${c.index}`}>{index}</span>
          )}
          <span aria-hidden="true" className={`h-px w-8 shrink-0 ${c.rule}`} />
          {icon && <span className={c.eyebrow} aria-hidden="true">{icon}</span>}
          {eyebrow && (
            <span className={`text-[11px] font-bold uppercase tracking-eyebrow ${c.eyebrow}`}>
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2 className={`text-3xl font-bold sm:text-4xl md:text-[2.6rem] ${c.title}`}>{title}</h2>

      {lead && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${c.lead}`}>{lead}</p>
      )}
    </header>
  );
};

export default SectionHeading;
