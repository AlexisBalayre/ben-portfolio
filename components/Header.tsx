import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from './LanguageSwitcher';
import {
  AcademicCapIcon,
  Bars3Icon,
  EnvelopeIcon,
  CameraIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderMenuLink {
  label: string;
  section: string;
  icon?: React.ReactNode;
}

export const menuLinks: HeaderMenuLink[] = [
  { label: "header.about_me",          section: "",                icon: <UserIcon className="h-4 w-4" /> },
  { label: "header.portfolio",          section: "portfolio",       icon: <CameraIcon className="h-4 w-4" /> },
  { label: "header.associative_career", section: "associativeCareer", icon: <AcademicCapIcon className="h-4 w-4" /> },
  { label: "header.contact_details",    section: "contact",         icon: <EnvelopeIcon className="h-4 w-4" /> },
];

export const HeaderMenuLinks = ({ onSelect }: { onSelect?: () => void }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('aboutMe');

  const handleActive = (section: string) => {
    if (section === "contact") {
      const footer = document.getElementById('contact');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#contact', undefined, { scroll: false });
      }
      onSelect?.();
      return;
    }
    setActiveSection(section || 'aboutMe');
    router.push(`/${section}`, undefined, { scroll: false });
    onSelect?.();
  };

  useEffect(() => {
    const currentSection = router.pathname.split("/")[1];
    setActiveSection(currentSection || 'aboutMe');
  }, [router.pathname]);

  return (
    <>
      {menuLinks.map(({ label, section, icon }) => {
        const key = section || 'aboutMe';
        const isActive = activeSection === key;
        return (
          <li key={section} className="relative">
            <button
              onClick={() => handleActive(section)}
              className={`relative flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200 z-10 ${
                isActive
                  ? "text-white"
                  : "text-base-content/70 hover:text-base-content"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="hidden sm:block relative z-10" aria-hidden="true">{icon}</span>
              <span className="relative z-10">{t(label)}</span>
            </button>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const cvFile = locale === 'en' ? 'CV_Benjamin_Balayre_EN.pdf' : 'CV_Benjamin_Balayre_FR.pdf';
  const burgerMenuRef = useRef<HTMLDivElement>(null!);
  useOutsideClick(burgerMenuRef, useCallback(() => setIsDrawerOpen(false), []));

  return (
    <header className="fixed top-0 inset-x-0 z-20 bg-white/90 backdrop-blur-md border-b border-base-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Left — logo + nav */}
        <div className="flex items-center gap-4">
          {/* Mobile burger */}
          <div className="lg:hidden relative" ref={burgerMenuRef}>
            <button
              aria-label={isDrawerOpen ? t('header.close_menu') : t('header.open_menu')}
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen(v => !v)}
              className="p-2 rounded-lg text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
            >
              {isDrawerOpen
                ? <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                : <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              }
            </button>

            <AnimatePresence>
              {isDrawerOpen && (
                <motion.ul
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-base-200 p-2 flex flex-col gap-1"
                >
                  <HeaderMenuLinks onSelect={() => setIsDrawerOpen(false)} />
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Logo */}
          <Link
            href="/"
            scroll={false}
            className="flex flex-col leading-none hover:opacity-80 transition-opacity"
          >
            <span className="font-bold text-sm tracking-tight">Benjamin Balayre</span>
            <span className="text-[11px] text-base-content/50 font-normal">{t('header.student_role')}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <HeaderMenuLinks />
            </ul>
          </nav>
        </div>

        {/* Right — lang + CV */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={`/assets/documents/${cvFile}`}
            download
            className="btn btn-primary text-sm px-4 py-2 rounded-lg"
          >
            {t('header.download_resume')}
          </a>
        </div>
      </div>
    </header>
  );
};
