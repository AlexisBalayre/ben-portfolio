import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AssoChapter, { AssoChapterProps, AssoRole } from '~~/src/components/AssoChapter';
import { PageHero, Section, SectionHeading, type Tone } from '~~/src/components/ui';
import { associations } from '~~/src/data/journey';

/**
 * Les mandats viennent de `associations.json`, la même source que la frise de
 * l'accueil : impossible que les deux racontent des rôles différents.
 * Ordre antichronologique, comme le reste de la page.
 */
const rolesOf = (id: string): AssoRole[] =>
  [...(associations.find((asso) => asso.id === id)?.roles ?? [])]
    .reverse()
    .map((role) => ({ year: role.start.slice(0, 4), labelKey: `associative.roles.${role.role}` }));

/**
 * Les trois engagements, décrits par la donnée plutôt que par trois blocs de
 * balisage recopiés. Le sommaire en tête de page et les chapitres lisent la
 * même liste, ils ne peuvent donc pas diverger.
 */
const ASSOS: (AssoChapterProps & { logo: string; roleKey: string })[] = [
  {
    id: 'iseplive',
    index: '01',
    tone: 'paper' as Tone,
    logo: '/assets/images/iseplive.png',
    titleKey: 'associative.iseplive.title',
    eyebrowKey: 'associative.iseplive.eyebrow',
    leadKey: 'associative.iseplive.lead',
    roleKey: 'associative.iseplive.role',
    blocks: [
      {
        titleKey: 'associative.iseplive.presentation_title',
        descKey: 'associative.iseplive.presentation_desc',
        media: [{ src: '/assets/images/iseplive.png', alt: 'ISEP Live', shape: 'logo' }],
      },
      {
        titleKey: 'associative.iseplive.iseplife_title',
        descKey: 'associative.iseplive.iseplife_desc',
        media: [{ src: '/assets/images/portfolio/logos/Iseplife.png', alt: 'ISEP Life', shape: 'logo' }],
      },
      {
        titleKey: 'associative.iseplive.path_title',
        descKey: 'associative.iseplive.path_desc',
        roles: rolesOf('iseplive'),
        media: [
          { src: '/assets/images/portfolio/IL.jpg', alt: 'ISEP Live en reportage', shape: 'wide' },
          { src: '/assets/images/portfolio/IL2.jpg', alt: 'ISEP Live en reportage', shape: 'wide' },
        ],
      },
    ],
    links: [
      { href: 'https://www.instagram.com/iseplive', kind: 'instagram' },
      { href: 'https://www.youtube.com/@iseplive', kind: 'youtube' },
    ],
  },
  {
    id: 'vizion',
    index: '02',
    tone: 'mist' as Tone,
    logo: '/assets/images/Vizion.png',
    titleKey: 'associative.vizion.title',
    eyebrowKey: 'associative.vizion.eyebrow',
    leadKey: 'associative.vizion.lead',
    roleKey: 'associative.vizion.role',
    blocks: [
      {
        titleKey: 'associative.vizion.presentation_title',
        descKey: 'associative.vizion.presentation_desc',
        media: [{ src: '/assets/images/Vizion.png', alt: 'Vizion BDE', shape: 'logo' }],
      },
      {
        titleKey: 'associative.vizion.path_title',
        descKey: 'associative.vizion.path_desc',
        roles: rolesOf('vizion'),
        media: [
          { src: '/assets/images/Vizion_illustration.jpg', alt: 'Événement Vizion BDE', shape: 'portrait' },
        ],
      },
    ],
    links: [{ href: 'https://www.instagram.com/vizion_bdeisep', kind: 'instagram' }],
  },
  {
    id: 'isepdrone',
    index: '03',
    tone: 'paper' as Tone,
    logo: '/assets/images/isepdrone.png',
    titleKey: 'associative.isepdrone.title',
    eyebrowKey: 'associative.isepdrone.eyebrow',
    leadKey: 'associative.isepdrone.lead',
    roleKey: 'associative.isepdrone.role',
    blocks: [
      {
        titleKey: 'associative.isepdrone.presentation_title',
        descKey: 'associative.isepdrone.presentation_desc',
        media: [{ src: '/assets/images/isepdrone.png', alt: 'ISEP Drone', shape: 'logo' }],
      },
      {
        titleKey: 'associative.isepdrone.path_title',
        descKey: 'associative.isepdrone.path_desc',
        roles: rolesOf('isepdrone'),
        media: [{ src: '/assets/images/drone_illustration.JPG', alt: 'Vol FPV', shape: 'wide' }],
      },
    ],
    links: [{ href: 'https://www.instagram.com/isep_drone', kind: 'instagram' }],
  },
];

const AssociativeCareer: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        image="/assets/images/portfolio/asso2.jpg"
        eyebrow={t('associative.eyebrow')}
        title={t('associative.title')}
        lead={t('associative.hero_desc')}
      />

      {/* Sommaire : les trois engagements avant d'entrer dans le détail. */}
      <Section id="engagements" tone="mist" size="md">
        <SectionHeading
          eyebrow={t('associative.summary_eyebrow')}
          title={t('associative.summary_title')}
          lead={t('associative.summary_desc')}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {ASSOS.map(({ id, index, logo, titleKey, eyebrowKey, roleKey }) => (
            <a
              key={id}
              href={`#${id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <Image
                  src={logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span className="text-xs font-bold tracking-eyebrow text-accent">{index}</span>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-eyebrow text-base-content/45">
                  {t(eyebrowKey)}
                </p>
                <p className="mt-1 font-bold transition-colors duration-200 group-hover:text-primary">
                  {t(titleKey)}
                </p>
                <p className="mt-2 text-sm text-base-content/60">{t(roleKey)}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {ASSOS.map(({ logo, roleKey, ...chapter }) => (
        <AssoChapter key={chapter.id} {...chapter} />
      ))}
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default AssociativeCareer;
