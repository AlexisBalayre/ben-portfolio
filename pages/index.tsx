import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AcademicCapIcon, BriefcaseIcon, CameraIcon, UserGroupIcon } from '@heroicons/react/24/outline';
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
        <div className="pt-10 w-full overflow-y-auto overflow-x-hidden bg-white ">
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
            <div className="md:py-12 mt-10 md:mt-0 bg-gray-100 w-full px-10 md:px-20 group" id="education">
                <div className="max-w-4xl mx-auto">
                    <span className="flex flex-row items-center justify-center md:justify-start">
                        <AcademicCapIcon className="h-8 w-8 mr-2 -mt-1.5 transition-all duration-500 group-hover:-translate-y-1" />
                        <h2 className="text-4xl font-bold text-center md:text-left text-base-content/80 transition-all duration-500 group-hover:text-base-content group-hover:opacity-100 group-hover:-translate-y-1">{t('home.education_title')}</h2>
                    </span>
                    <p className="py-6 ">{t('home.education_desc')}</p>
                    <Timeline items={education} />
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="md:py-12 mt-10 md:mt-0 w-full px-10 md:px-20 group" id="education">
                <div className="max-w-4xl mx-auto">
                    <span className="flex flex-row items-center justify-center md:justify-start">
                        <BriefcaseIcon className="h-8 w-8 mr-2 -mt-1.5 transition-all duration-500 group-hover:-translate-y-1" />
                        <h2 className="text-4xl font-bold text-center md:text-left text-base-content/80 transition-all duration-500 group-hover:text-base-content group-hover:opacity-100 group-hover:-translate-y-1">{t('home.experience_title')}</h2>
                    </span>
                    <p className="t">{t('home.experience_desc')}</p>
                    <TimelineDark items={experiences} />
                </div>
            </div>

            {/* Portfolio Preview Section */}
            <div className="w-full bg-base-200">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="flex-1 flex flex-col justify-center p-10 md:p-20 group">
                        <div className="flex items-center mb-6">
                            <CameraIcon className="h-8 w-8 mr-2 -mt-1.5 text-base-content/80 transition-all duration-500 group-hover:text-base-content group-hover:opacity-100 group-hover:-translate-y-1" />
                            <h2 className="text-4xl font-bold text-base-content/80 transition-all duration-500 group-hover:text-base-content group-hover:opacity-100 group-hover:-translate-y-1">{t('home.portfolio_preview_title')}</h2>
                        </div>
                        <p className="mb-6 text-lg">{t('home.portfolio_preview_desc')}</p>
                        <div>
                            <Link href="/portfolio" className="btn btn-primary rounded-xl text-base-100">
                                {t('home.portfolio_preview_button')}
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 relative min-h-[400px] md:min-h-[600px]">
                        <Image 
                            src="/assets/images/portfolio/Japon/image1.jpg" 
                            alt="Portfolio Preview" 
                            fill
                            style={{ objectFit: "cover" }}
                            className=""
                        />
                    </div>
                </div>
            </div>
            {/* Associative Career Preview Section */}
            <div className="w-full relative h-[600px]">
                <Image 
                    src="/assets/images/portfolio/asso2.jpg" 
                    alt="Associative Career Preview" 
                    fill
                    style={{ objectFit: "cover" }}
                    className="z-0"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-20 group">
                    <div className="flex items-center justify-center mb-6">
                        <UserGroupIcon className="h-8 w-8 mr-2 -mt-1.5 text-white/80 transition-all duration-500 group-hover:text-white group-hover:opacity-100 group-hover:-translate-y-1" />
                        <h2 className="text-4xl font-bold text-white/80 transition-all duration-500 group-hover:text-white group-hover:opacity-100 group-hover:-translate-y-1">{t('home.associative_preview_title')}</h2>
                    </div>
                    <p className="mb-8 text-lg text-white max-w-2xl">{t('home.associative_preview_desc')}</p>
                    <Link href="/associativeCareer" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-xl hover:scale-105 transition-transform">
                        {t('home.associative_preview_button')}
                    </Link>
                </div>
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