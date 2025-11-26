import React from 'react';
import Image from 'next/image';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Timeline from '~~/components/Timeline';
import TimelineDark from '~~/components/TimelineDark';
import experiences from "~~/public/assets/data/experiences.json";
import education from "~~/public/assets/data/formation.json";
import { NextPage } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {
    const { t } = useTranslation('common');
    return (
        <div className="pt-10 w-full overflow-y-auto overflow-x-hidden 	bg-neutral-content">
            <div className="hero md:mt-20 md:mb-20 mt-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <Image src="/assets/images/pp.jpg" alt="Photo de Benjamin Balayre" width={300} height={300} className="max-w-sm rounded-full shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{t('home.name')}</h1>
                        <h2 className="text-3xl">{t('home.role')}</h2>
                        <p className="py-6">
                            {t('home.welcome')}
                        </p>
                        <a href="/assets/documents/Benjamin_Balayre_CV.pdf" className="btn btn-primary rounded-xl text-base-100" download>
                            {t('home.download_resume')}
                        </a>
                    </div>
                </div>
            </div>

            {/* Education Timeline */}
            <div className="md:py-12 mt-10 md:mt-0 bg-primary-content w-full px-10 md:px-20" id="education">
                <span className="flex flex-row items-center justify-center md:justify-start">
                    <AcademicCapIcon className="h-8 w-8 mr-2 flex place-self-center text-base-100" />
                    <h2 className="text-4xl font-bold text-center md:text-left text-base-100">{t('home.education_title')}</h2>
                </span>
                <p className="text-base-100">{t('home.education_desc')}</p>
                <Timeline items={education} />
            </div>

            {/* Experience Timeline */}
            <div className="md:py-12 mt-10 md:mt-0 w-full px-10 md:px-20" id="education">
                <span className="flex flex-row items-center justify-center md:justify-start">
                    <BriefcaseIcon className="h-8 w-8 mr-2 flex place-self-center" />
                    <h2 className="text-4xl font-bold text-center md:text-left">{t('home.experience_title')}</h2>
                </span>
                <p className="t">{t('home.experience_desc')}</p>
                <TimelineDark items={experiences} />
            </div>
        </div>
    );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;