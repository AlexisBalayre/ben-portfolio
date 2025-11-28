import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';

const Projects = () => {
    const { t } = useTranslation('common');

    return (
        <div className="hero w-full aspect-[3022/1772] relative overflow-hidden">
            <div className="absolute inset-0 flex w-[200%] animate-scroll-infinite">
                <div className="relative w-1/2 h-full">
                    <Image
                        src="/assets/images/portfolio.png"
                        alt="Portfolio background"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="brightness-50"
                        quality={80}
                    />
                </div>
                <div className="relative w-1/2 h-full">
                    <Image
                        src="/assets/images/portfolio.png"
                        alt="Portfolio background"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="brightness-50"
                        quality={80}
                    />
                </div>
            </div>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content relative z-10">
                <div className="max-w-lg">
                    <h2 className="mb-5 text-4xl md:text-5xl font-bold text-white">{t('external_portfolio.title')}</h2>
                    <p className="mb-8 text-white text-lg md:text-xl">
                        {t('external_portfolio.description')}
                    </p>
                    <a
                        href="https://benjaminbalayre.myportfolio.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-lg bg-white text-black border-none hover:bg-gray-200 hover:scale-105 transition-transform"
                    >
                        {t('external_portfolio.button')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Projects;