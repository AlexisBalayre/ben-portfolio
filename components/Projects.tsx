import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const Projects = () => {
    const { t } = useTranslation('common');

    return (
        <div className="relative w-full min-h-[500px] md:min-h-[580px] overflow-hidden flex items-center justify-center">
            {/* Scrolling background — direction correcte (0 → -50%) via animate-scroll de globals.css */}
            <div className="absolute inset-0 flex w-[200%] animate-scroll pointer-events-none">
                <div className="relative w-1/2 h-full">
                    <Image
                        src="/assets/images/portfolio.png"
                        alt="Portfolio background"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="brightness-[0.35]"
                        quality={80}
                    />
                </div>
                <div className="relative w-1/2 h-full">
                    <Image
                        src="/assets/images/portfolio.png"
                        alt="Portfolio background"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="brightness-[0.35]"
                        quality={80}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 md:px-20 py-20 max-w-2xl mx-auto">
                <span className="text-white/60 text-xs tracking-[0.25em] uppercase mb-6 block">
                    {t('external_portfolio.title')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {t('external_portfolio.description')}
                </h2>
                <a
                    href="https://benjaminbalayre.myportfolio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase bg-white text-black border border-white px-8 py-4 rounded-full hover:bg-transparent hover:text-white transition-all duration-300 shadow-xl"
                >
                    {t('external_portfolio.button')}
                    <ArrowUpRightIcon className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
            </div>
        </div>
    );
};

export default Projects;
