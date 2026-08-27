import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from './LanguageSwitcher';
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
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
}

export const menuLinks: HeaderMenuLink[] = [
  { label: "header.about_me",          section: "",                icon: <UserIcon className="h-4 w-4" /> },
  { label: "header.photo_video",        section: "prestation",      icon: <CameraIcon className="h-4 w-4" /> },
  { label: "header.associative_career", section: "associativeCareer", icon: <AcademicCapIcon className="h-4 w-4" /> },
  { label: "header.contact_details",    section: "contact",         icon: <EnvelopeIcon className="h-4 w-4" /> },
];

/**
 * `bar` : la nav horizontale du desktop. L'entrée courante est signalée par un
 * filet accent sous le mot, pas par une pastille pleine : le header reste une
 * ligne de texte, comme le reste de la page.
 * `drawer` : le tiroir mobile, où chaque entrée prend toute la ligne pour
 * offrir une cible atteignable au doigt. Là, la pastille pleine se justifie :
 * c'est une liste, pas une ligne.
 */
type MenuVariant = 'bar' | 'drawer';

const MENU_SHAPE: Record<
  MenuVariant,
  { button: string; indicator: string; active: string; idle: string; showIcon: boolean }
> = {
  bar: {
    button: 'h-9 px-3',
    indicator: 'absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-accent',
    active: 'font-semibold text-base-content',
    idle: 'text-base-content/55 hover:text-base-content',
    showIcon: false,
  },
  drawer: {
    button: 'w-full min-h-[44px] rounded-xl px-3',
    indicator: 'absolute inset-0 rounded-xl bg-primary shadow-sm',
    active: 'font-semibold text-white',
    idle: 'text-base-content/70 hover:bg-base-200 hover:text-base-content',
    showIcon: true,
  },
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
      {menuLinks.map(({ label, section, icon }) => {
        const key = section || 'aboutMe';
        const isActive = activeSection === key;
        const shape = MENU_SHAPE[variant];
        const classes = `relative z-10 flex items-center gap-2 text-sm transition-colors duration-200 ${
          shape.button
        } ${isActive ? shape.active : shape.idle}`;
        return (
          <li key={section} className="relative">
            <button onClick={() => handleActive(section)} className={classes}>
              {isActive && (
                <motion.span
                  layoutId={`nav-indicator-${variant}`}
                  className={shape.indicator}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {shape.showIcon && (
                <span className="relative z-10" aria-hidden="true">
                  {icon}
                </span>
              )}
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

  // Tant que la page est en haut, le header ne pose aucun filet : il se
  // confond avec le héros. Le filet et l'ombre n'apparaissent qu'au décollage,
  // quand il faut séparer la barre du contenu qui passe dessous.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b bg-base-100/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        isScrolled ? 'border-base-300/70 shadow-sm' : 'border-transparent'
      }`}
    >
      {/* Le header occupe toute la largeur de l'écran, sans colonne centrale :
          l'identité se cale à gauche, la nav au centre, langue et CV à droite.
          Les deux groupes latéraux partagent `flex-1`, ce qui centre la nav sur
          l'écran et non sur la place qui reste. */}
      <div className="flex h-[var(--header-h)] w-full items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-10">

        {/* Gauche : burger et identité. `min-w-0` rend le groupe compressible :
            c'est lui qui cède si la place manque, jamais le bouton CV. */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
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
            {/* Le métier ne s'affiche qu'à partir de `xl`, la seule largeur où
                il tient en entier : mieux vaut pas de surtitre qu'un surtitre
                coupé au milieu d'un mot. `truncate` reste le garde-fou si le
                libellé s'allonge un jour. */}
            <span className="mt-1 hidden truncate text-[10px] font-bold uppercase tracking-eyebrow text-base-content/40 xl:block">
              {t('header.role')}
            </span>
          </Link>

        </div>

        {/* Centre : navigation */}
        <nav className="hidden shrink-0 lg:block">
          <ul className="flex items-center gap-2">
            <HeaderMenuLinks />
          </ul>
        </nav>

        {/* Droite : langue et CV */}
        {/* `flex-1` seulement à partir de `lg` : c'est là qu'il y a une nav à
            centrer. En dessous, le groupe ne prend que sa place et laisse tout
            le reste à l'identité, qui n'a donc pas à se tronquer. */}
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:flex-1">
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
