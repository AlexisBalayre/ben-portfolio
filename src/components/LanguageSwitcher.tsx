import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const LOCALES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
] as const;

/**
 * Commutateur de langue : un segment par locale, la pastille glisse de l'un à
 * l'autre. Pas de drapeau, dont le rendu change d'un système à l'autre et qui
 * confond la langue avec un pays : deux lettres suffisent et tiennent la
 * typographie du reste du header.
 *
 * Chaque segment est un vrai lien vers la même page dans l'autre locale, ce qui
 * le rend ouvrable dans un nouvel onglet et lisible par les moteurs.
 */
const LanguageSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div
      role="group"
      aria-label={t('header.switch_language')}
      className="grid h-11 place-items-center"
    >
      <div className="relative flex h-8 items-center rounded-full border border-base-300 bg-base-200/70 p-0.5">
        {LOCALES.map(({ code, label }) => {
          const isActive = router.locale === code;
          return (
            <Link
              key={code}
              href={{ pathname: router.pathname, query: router.query }}
              locale={code}
              scroll={false}
              hrefLang={code}
              aria-label={t(`header.language.${code}`)}
              aria-current={isActive ? 'true' : undefined}
              className={`relative grid h-7 w-9 place-items-center rounded-full text-[11px] font-bold tracking-eyebrow transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-base-content/45 hover:text-base-content/75'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-base-100 shadow-sm ring-1 ring-base-300"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
