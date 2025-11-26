import type { NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HeroSection = dynamic(() => import('~~/components/HeroSection'));
const LatestProject = dynamic(() => import('~~/components/LatestProject'));
const Projects = dynamic(() => import('~~/components/Projects'));
const Carousel = dynamic(() => import('~~/components/Carousel'));
const SkillsSection = dynamic(() => import('~~/components/SkillsSection'));

import skills from "~~/public/assets/data/skills.json";

const Portfolio: NextPage = () => {
    return (
      <div className="w-full overflow-hidden">
        <HeroSection />
        <LatestProject />
        <Projects />
        <Carousel />
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
