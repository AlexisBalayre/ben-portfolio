import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
    ArrowUpIcon,
    ArrowDownTrayIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';
import { LinkedinLogo } from '~~/public/assets/svg/LinkedinLogo';
import { GithubLogo } from '~~/public/assets/svg/GithubLogo';
import { InstagramLogo } from '~~/public/assets/svg/InstagramLogo';
import { YouTubeLogo } from '~~/public/assets/svg/YouTubeLogo';
import { actionClasses } from '~~/src/components/ui';

const socials = [
    { href: 'https://www.linkedin.com/in/Benjamin-balayre', label: 'LinkedIn', icon: LinkedinLogo },
    { href: 'https://github.com/benbalayre', label: 'GitHub', icon: GithubLogo },
    { href: 'https://www.instagram.com/ben_balayre/', label: 'Instagram', icon: InstagramLogo },
    { href: 'https://www.youtube.com/@ben_balayre', label: 'YouTube', icon: YouTubeLogo },
];

const pages = [
    { href: '/', label: 'header.about_me' },
    { href: '/portfolio', label: 'header.portfolio' },
    { href: '/associativeCareer', label: 'header.associative_career' },
];

const elsewhere = [
    { href: 'https://portfolio.benevolence.fr', label: 'home.quick_portfolio' },
    { href: 'https://benevolence.fr', label: 'home.quick_benevolence' },
];

const BUILD_YEAR = new Date().getFullYear();

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">{children}</p>
);

const linkClass =
    'inline-flex min-h-[36px] items-center text-sm text-white/60 transition-colors duration-200 hover:text-white';

export const Footer = () => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    // L'année est figée au build par la génération statique : on la rafraîchit
    // après le montage, sans divergence d'hydratation.
    const [year, setYear] = useState(BUILD_YEAR);
    useEffect(() => setYear(new Date().getFullYear()), []);

    const cvFile = locale === 'en' ? 'CV_Benjamin_Balayre_EN.pdf' : 'CV_Benjamin_Balayre_FR.pdf';

    return (
        <footer className="bg-secondary text-white/60" id="contact">
            <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {/* Identité */}
                    <div className="lg:col-span-2 lg:pr-8">
                        <p className="text-lg font-bold tracking-wide text-white">Benjamin Balayre</p>
                        <p className="mt-1 text-sm font-medium text-accent">{t('header.role')}</p>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
                            {t('footer.tagline')}
                        </p>
                        <a
                            href={`/assets/documents/${cvFile}`}
                            download
                            className={actionClasses('outline', 'dark', 'md', 'mt-6')}
                        >
                            <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                            {t('home.download_resume')}
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav aria-labelledby="footer-nav">
                        <p id="footer-nav" className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                            {t('footer.nav_title')}
                        </p>
                        <ul className="flex flex-col">
                            {pages.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} scroll={false} className={linkClass}>
                                        {t(label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <ColumnTitle>{t('footer.elsewhere_title')}</ColumnTitle>
                            <ul className="flex flex-col">
                                {elsewhere.map(({ href, label }) => (
                                    <li key={href}>
                                        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                            {t(label)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Contact */}
                    <div>
                        <ColumnTitle>{t('footer.contact_title')}</ColumnTitle>
                        <address className="flex flex-col not-italic">
                            <a
                                href="mailto:benjamin@balayre.com"
                                className={`${linkClass} gap-2`}
                                aria-label={t('footer.email_aria')}
                            >
                                <EnvelopeIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                benjamin@balayre.com
                            </a>
                            <a
                                href="tel:+33782347644"
                                className={`${linkClass} gap-2`}
                                aria-label={t('footer.phone_aria')}
                            >
                                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                07 82 34 76 44
                            </a>
                            <p className="inline-flex min-h-[36px] items-center gap-2 text-sm text-white/50">
                                <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                {t('footer.location')}
                            </p>
                        </address>

                        <nav aria-label={t('footer.social_aria')} className="mt-5">
                            <ul className="flex flex-wrap items-center gap-2">
                                {socials.map(({ href, label, icon: Icon }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            title={label}
                                            className="group grid h-11 w-11 place-items-center rounded-xl border border-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                                        >
                                            <Icon className="h-4 w-4 text-white/50 transition-colors duration-200 group-hover:text-white" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Bas de page */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                    <p className="text-xs tracking-wide text-white/30">
                        © {year} Benjamin Balayre · {t('home.rights_reserved')}
                    </p>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-white/40 transition-colors duration-200 hover:text-white"
                    >
                        <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {t('footer.back_to_top')}
                    </button>
                </div>
            </div>
        </footer>
    );
};
