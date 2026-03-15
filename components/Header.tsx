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
  const [isActive, setIsActive] = useState({
    aboutMe: true, portfolio: false, associativeCareer: false, contact: false,
  });

  const handleActive = (section: string) => {
    if (section !== "contact") {
      setIsActive({ aboutMe: false, portfolio: false, associativeCareer: false, contact: false, [section]: true });
    }
    if (section === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      router.push(`/${section}`, undefined, { scroll: false });
    }
    onSelect?.();
  };

  useEffect(() => {
    const currentSection = router.pathname.split("/")[1];
    setIsActive({ aboutMe: false, portfolio: false, associativeCareer: false, contact: false, [currentSection]: true });
  }, [router.pathname]);

  return (
    <>
      {menuLinks.map(({ label, section, icon }) => (
        <li key={section}>
          <button
            onClick={() => handleActive(section)}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
              isActive[section as keyof typeof isActive]
                ? "bg-primary text-white shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200"
            }`}
          >
            <span className="hidden sm:block" aria-hidden="true">{icon}</span>
            {t(label)}
          </button>
        </li>
      ))}
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
              aria-label={isDrawerOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen(v => !v)}
              className="p-2 rounded-lg text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
            >
              {isDrawerOpen
                ? <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                : <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              }
            </button>

            {isDrawerOpen && (
              <ul className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-base-200 p-2 flex flex-col gap-1">
                <HeaderMenuLinks onSelect={() => setIsDrawerOpen(false)} />
              </ul>
            )}
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
