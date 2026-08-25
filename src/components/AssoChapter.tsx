import React, { Fragment } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

import { InstagramLogo } from '~~/public/assets/svg/InstagramLogo';
import { YouTubeLogo } from '~~/public/assets/svg/YouTubeLogo';
import { EASE, Section, SectionHeading, VIEWPORT, type Tone } from '~~/src/components/ui';

/** Les descriptions du fichier de traduction portent des <br /> littéraux. */
const renderHtmlText = (text: string) =>
  text.split(/<br\s*\/?>/gi).map((part, i, all) => (
    <Fragment key={i}>
      {part}
      {i < all.length - 1 && <br />}
    </Fragment>
  ));

type MediaShape = 'logo' | 'wide' | 'portrait';

// La largeur fait partie de la forme : le conteneur ne pose pas de `w-full`,
// qui entrerait en conflit avec ces classes dans le même groupe d'utilitaires.
const SHAPE: Record<MediaShape, string> = {
  logo: 'mx-auto aspect-square w-40 rounded-full sm:w-52 md:w-60',
  wide: 'aspect-[3/2] w-full rounded-2xl',
  portrait: 'mx-auto aspect-[2/3] w-full max-w-[17rem] rounded-2xl',
};

export interface AssoMedia {
  src: string;
  alt: string;
  shape: MediaShape;
}

export interface AssoRole {
  year: string;
  labelKey: string;
}

export interface AssoBlock {
  titleKey: string;
  descKey: string;
  media?: AssoMedia[];
  roles?: AssoRole[];
}

export interface AssoChapterProps {
  id: string;
  index: string;
  tone: Tone;
  titleKey: string;
  eyebrowKey: string;
  leadKey: string;
  blocks: AssoBlock[];
  links: { href: string; kind: 'instagram' | 'youtube' }[];
}

const LOGOS = { instagram: InstagramLogo, youtube: YouTubeLogo };

const Media = ({ media }: { media: AssoMedia[] }) => (
  <div className={media.length > 1 ? 'grid gap-4 sm:grid-cols-2 md:grid-cols-1' : ''}>
    {media.map((m) => (
      <div key={m.src} className={`relative overflow-hidden ${SHAPE[m.shape]}`}>
        <Image
          src={m.src}
          alt={m.alt}
          fill
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-cover"
        />
      </div>
    ))}
  </div>
);

const Roles = ({ roles }: { roles: AssoRole[] }) => {
  const { t } = useTranslation('common');
  return (
    <ol className="mt-8 space-y-5 border-l-2 border-primary/15 pl-6">
      {roles.map((role) => (
        <li key={role.year} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-base-100"
          />
          <p className="text-xs font-bold tracking-eyebrow text-accent">{role.year}</p>
          <p className="mt-1 font-semibold">{t(role.labelKey)}</p>
        </li>
      ))}
    </ol>
  );
};

/**
 * Un engagement associatif. Les trois associations partagent cette forme :
 * même en-tête numérotée, mêmes blocs texte/image alternés, mêmes liens.
 */
const AssoChapter = ({
  id,
  index,
  tone,
  titleKey,
  eyebrowKey,
  leadKey,
  blocks,
  links,
}: AssoChapterProps) => {
  const { t } = useTranslation('common');
  const name = t(titleKey);

  return (
    <Section id={id} tone={tone} size="lg" reveal={false}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        viewport={VIEWPORT}
      >
        <SectionHeading index={index} eyebrow={t(eyebrowKey)} title={name} lead={t(leadKey)} />
      </motion.div>

      <div className="mt-14 space-y-16 md:space-y-20">
        {blocks.map((block, i) => (
          <motion.div
            key={block.titleKey}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={VIEWPORT}
          >
            <div className={i % 2 === 1 ? 'md:order-last' : ''}>
              <h3 className="text-xl font-bold sm:text-2xl">{t(block.titleKey)}</h3>
              <p className="mt-4 leading-relaxed text-base-content/70">
                {renderHtmlText(t(block.descKey))}
              </p>
              {block.roles && <Roles roles={block.roles} />}
            </div>

            {block.media && <Media media={block.media} />}
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center gap-3">
        {links.map(({ href, kind }) => {
          const Logo = LOGOS[kind];
          return (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — ${kind === 'instagram' ? 'Instagram' : 'YouTube'}`}
              className="grid h-12 w-12 place-items-center rounded-xl border border-base-300 bg-base-100 text-base-content/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <Logo className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </Section>
  );
};

export default AssoChapter;
