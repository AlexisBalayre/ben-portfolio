import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from './LanguageSwitcher';
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  EnvelopeIcon,
  CameraIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/src/hooks";
import { actionClasses } from "~~/src/components/ui";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderMenuLink {
  label: string;
  section: string;
  icon?: React.ReactNode;
  /** Lien sortant : l'entrée quitte le site au lieu d'y naviguer. */
  external?: string;
}

export const menuLinks: HeaderMenuLink[] = [
  { label: "header.about_me",          section: "",                icon: <UserIcon className="h-4 w-4" /> },
  { label: "header.photo_video",        section: "prestation",      icon: <CameraIcon className="h-4 w-4" />, external: "https://prestation.benevolence.fr" },
  { label: "header.associative_career", section: "associativeCareer", icon: <AcademicCapIcon className="h-4 w-4" /> },
  { label: "header.contact_details",    section: "contact",         icon: <EnvelopeIcon className="h-4 w-4" /> },
];

/**
 * `bar` : la nav horizontale du desktop, entrées en pastilles.
 * `drawer` : le tiroir mobile, où chaque entrée prend toute la ligne pour
 * offrir une cible atteignable au doigt.
 */
type MenuVariant = 'bar' | 'drawer';

const MENU_SHAPE: Record<MenuVariant, { button: string; pill: string }> = {
  bar: { button: 'min-h-[44px] rounded-full px-3', pill: 'rounded-full' },
  drawer: { button: 'w-full min-h-[44px] rounded-xl px-3', pill: 'rounded-xl' },
};

export const HeaderMenuLinks = ({
  onSelect,
  variant = 'bar',
}: {
  onSelect?: () => void;
  variant?: MenuVariant;
}) => {
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
      {menuLinks.map(({ label, section, icon, external }) => {
        const key = section || 'aboutMe';
        const isActive = !external && activeSection === key;
        const classes = `relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
          MENU_SHAPE[variant].button
        } ${
          isActive ? "text-white" : "text-base-content/70 hover:text-base-content"
        }`;
        const contenu = (
          <>
            {isActive && (
              <motion.span
                layoutId={`nav-pill-${variant}`}
                className={`absolute inset-0 bg-primary shadow-sm ${MENU_SHAPE[variant].pill}`}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            <span className="hidden sm:block relative z-10" aria-hidden="true">{icon}</span>
            <span className="relative z-10">{t(label)}</span>
            {external && (
              <ArrowUpRightIcon className="relative z-10 h-3 w-3 opacity-50" aria-hidden="true" />
            )}
          </>
        );
        return (
          <li key={section} className="relative">
            {external ? (
              <a
                href={external}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onSelect}
                className={classes}
              >
                {contenu}
              </a>
            ) : (
              <button onClick={() => handleActive(section)} className={classes}>
                {contenu}
              </button>
            )}
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
    <header className="fixed inset-x-0 top-0 z-30 border-b border-base-300/70 bg-base-100/85 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">

        {/* Gauche : logo et navigation. `min-w-0` rend le groupe compressible :
            c'est lui qui cède si la place manque, jamais le bouton CV. */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {/* Mobile burger */}
          {/* La marge négative laisse la cible de 44 px mordre sur la gouttière :
              l'icône reste alignée sur la colonne de texte et la place
              économisée revient au nom, qui n'a plus à être tronqué. */}
          <div className="relative -ml-2 shrink-0 lg:hidden" ref={burgerMenuRef}>
            <button
              aria-label={isDrawerOpen ? t('header.close_menu') : t('header.open_menu')}
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen(v => !v)}
              className="grid h-11 w-11 place-items-center rounded-xl text-base-content/70 transition-colors hover:bg-base-200 hover:text-base-content"
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
                  className="absolute left-0 top-full mt-2 flex w-56 max-w-[calc(100vw-2rem)] flex-col gap-1 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
                >
                  <HeaderMenuLinks variant="drawer" onSelect={() => setIsDrawerOpen(false)} />
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Logo */}
          <Link
            href="/"
            scroll={false}
            className="flex min-h-[44px] min-w-0 flex-col justify-center leading-none transition-opacity hover:opacity-80"
          >
            <span className="truncate text-xs font-bold tracking-tight sm:text-sm">Benjamin Balayre</span>
            <span className="hidden truncate text-[11px] font-normal text-base-content/50 sm:block">
              {t('header.role')}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden shrink-0 lg:block">
            <ul className="flex items-center gap-1">
              <HeaderMenuLinks />
            </ul>
          </nav>
        </div>

        {/* Droite : langue et CV */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={`/assets/documents/${cvFile}`}
            download
            className={actionClasses('solid', 'light', 'sm')}
          >
            <ArrowDownTrayIcon className="h-4 w-4 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">{t('header.download_resume')}</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </div>
    </header>
  );
};
