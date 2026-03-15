import type { NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HeroSection    = dynamic(() => import('~~/components/HeroSection'),         { loading: () => <div className="min-h-screen bg-base-200 animate-pulse" /> });
const BenevolenceSection = dynamic(() => import('~~/components/BenevolenceSection'), { loading: () => <div className="h-96 bg-[#0c0c0c] animate-pulse" /> });
const Projects       = dynamic(() => import('~~/components/Projects'),             { loading: () => <div className="h-96 bg-base-200 animate-pulse" /> });
const LatestProject  = dynamic(() => import('~~/components/LatestProject'),        { loading: () => <div className="h-96 bg-base-content animate-pulse" /> });
const SkillsSection  = dynamic(() => import('~~/components/SkillsSection'),        { loading: () => <div className="h-96 bg-base-100 animate-pulse" /> });

import skills from "~~/public/assets/data/skills.json";

const Portfolio: NextPage = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero photo avec parallax */}
      <HeroSection />

      {/* 2. Dernier projet vidéo */}
      <LatestProject />

      {/* 3. Boutique Benevolence — tirages fine art */}
      <BenevolenceSection />

      {/* 4. Portfolio complet externe */}
      <Projects />

      {/* 5. Compétences créatives */}
      <SkillsSection skills={skills} />
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

export default Portfolio;
