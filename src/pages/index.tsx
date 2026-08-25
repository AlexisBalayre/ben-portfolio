import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextPage } from 'next/types';
import { motion } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CameraIcon,
  GlobeEuropeAfricaIcon,
} from '@heroicons/react/24/outline';

import Carousel from '~~/src/components/Carousel';
import ExploreCard from '~~/src/components/ExploreCard';
import JourneyDetail from '~~/src/components/JourneyDetail';
import ParallelTimeline from '~~/src/components/ParallelTimeline';
import PhotoProjects from '~~/src/components/PhotoProjects';
import { Container, Section, SectionHeading, actionClasses, fadeUp, stagger } from '~~/src/components/ui';
import { education, experiences, imageProjects, timelineExperiences } from '~~/src/data/journey';

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const cvFile = locale === 'en' ? 'CV_Benjamin_Balayre_EN.pdf' : 'CV_Benjamin_Balayre_FR.pdf';

  // Sommaire de la page — le même découpage sert de fil rouge aux sections.
  const chapters = [
    { index: '01', href: '#parcours', label: t('home.chapter.journey'), icon: <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" /> },
    { index: '02', href: '#image', label: t('home.chapter.image'), icon: <CameraIcon className="h-4 w-4" aria-hidden="true" /> },
    { index: '03', href: '#explorer', label: t('home.chapter.explore'), icon: <GlobeEuropeAfricaIcon className="h-4 w-4" aria-hidden="true" /> },
  ];

  return (
    <div className="w-full overflow-x-clip">

      {/* ── Héros ─────────────────────────────────────────────── */}
      <section className="w-full bg-base-100 pb-14 pt-[calc(var(--header-h)+3rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+4.5rem)]">
        <Container>
          <motion.div
            className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-eyebrow text-base-content/50"
              >
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                {t('footer.location')}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              >
                {t('home.name')}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-lg font-semibold text-primary sm:text-xl"
              >
                {t('home.role')}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-relaxed text-base-content/65 sm:text-lg"
              >
                {t('home.welcome')}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
                <a href={`/assets/documents/${cvFile}`} download className={actionClasses('solid')}>
                  <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                  {t('home.download_resume')}
                </a>
                <a href="#parcours" className={actionClasses('outline')}>
                  {t('home.hero_cta_journey')}
                </a>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="order-first flex justify-center lg:order-none lg:justify-end">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/15 to-primary/5"
                />
                <Image
                  src="/assets/images/pp.jpg"
                  alt={t('home.name')}
                  width={320}
                  height={320}
                  priority
                  className="relative w-44 rounded-full object-cover shadow-xl ring-1 ring-base-300 sm:w-56 lg:w-72"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Sommaire */}
          <motion.nav
            aria-label={t('home.summary_aria')}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-base-300 bg-base-300 sm:mt-16 sm:grid-cols-3"
          >
            {chapters.map(({ index, href, label, icon }) => (
              <a
                key={href}
                href={href}
                className="group flex items-center gap-3 bg-base-100 px-5 py-4 transition-colors duration-200 hover:bg-base-200"
              >
                <span className="text-xs font-bold tracking-eyebrow text-accent">{index}</span>
                <span className="text-base-content/40 transition-colors duration-200 group-hover:text-primary">
                  {icon}
                </span>
                <span className="text-sm font-semibold text-base-content/75 transition-colors duration-200 group-hover:text-base-content">
                  {label}
                </span>
              </a>
            ))}
          </motion.nav>
        </Container>
      </section>

      {/* ── 01 · Parcours ─────────────────────────────────────── */}
      <Section id="parcours" tone="mist" size="lg">
        <SectionHeading
          index="01"
          eyebrow={t('home.chapter.journey')}
          icon={<CalendarDaysIcon className="h-4 w-4" />}
          title={t('journey.title')}
          lead={t('journey.subtitle')}
        />

        <div className="mt-12 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
          <ParallelTimeline education={education} experiences={experiences} />
        </div>

        <JourneyDetail education={education} experiences={timelineExperiences} />
      </Section>

      {/* ── 02 · L'image ──────────────────────────────────────── */}
      <Section id="image" tone="paper" size="lg" contained={false}>
        <Container>
          <SectionHeading
            index="02"
            eyebrow={t('home.chapter.image')}
            icon={<CameraIcon className="h-4 w-4" />}
            title={t('home.image_title')}
            lead={t('home.image_lead')}
          />

          <div className="mt-12">
            <PhotoProjects projects={imageProjects} />
          </div>

          {/* Les projets racontent le métier ; la bande qui suit montre le résultat. */}
          <div className="mt-16 flex items-center gap-4 sm:mt-20">
            <span aria-hidden="true" className="h-px flex-1 bg-base-300" />
            <span className="text-[11px] font-bold uppercase tracking-eyebrow text-base-content/45">
              {t('home.carousel_title')}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-base-300" />
          </div>
        </Container>

        <div className="mt-8">
          <Carousel />
        </div>
      </Section>

      {/* ── 03 · Aller plus loin ──────────────────────────────── */}
      <Section id="explorer" tone="mist" size="lg">
        <SectionHeading
          index="03"
          eyebrow={t('home.chapter.explore')}
          icon={<GlobeEuropeAfricaIcon className="h-4 w-4" />}
          title={t('home.explore_title')}
          lead={t('home.explore_desc')}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ExploreCard
            href="/portfolio"
            image="/assets/images/portfolio/Norway/image1.jpg"
            eyebrow={t('home.chapter.explore_portfolio')}
            title={t('home.portfolio_preview_title')}
            description={t('home.portfolio_preview_desc')}
            cta={t('home.portfolio_preview_button')}
          />
          <ExploreCard
            href="/associativeCareer"
            image="/assets/images/portfolio/asso2.jpg"
            eyebrow={t('home.chapter.explore_associative')}
            title={t('home.associative_preview_title')}
            description={t('home.associative_preview_desc')}
            cta={t('home.associative_preview_button')}
          />
        </div>

        {/* Les deux destinations externes : elles ne méritent pas une carte,
            mais elles ne doivent pas non plus n'exister que dans le pied de page. */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="https://portfolio.benevolence.fr"
            target="_blank"
            rel="noopener noreferrer"
            className={actionClasses('quiet', 'light', 'sm', '!px-0')}
          >
            {t('home.quick_portfolio')}
            <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href="https://benevolence.fr"
            target="_blank"
            rel="noopener noreferrer"
            className={actionClasses('quiet', 'light', 'sm', '!px-0')}
          >
            {t('home.quick_benevolence')}
            <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </Section>
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

export default Home;
