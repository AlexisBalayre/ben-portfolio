import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { LinkedinLogo } from '~~/public/assets/svg/LinkedinLogo';
import { GithubLogo } from '~~/public/assets/svg/GithubLogo';
import { InstagramLogo } from '~~/public/assets/svg/InstagramLogo';
import { YouTubeLogo } from '~~/public/assets/svg/YouTubeLogo';
import { useTranslation } from 'next-i18next';

const socials = [
  { href: 'https://www.linkedin.com/in/Benjamin-balayre', label: 'LinkedIn', icon: LinkedinLogo },
  { href: 'https://github.com/benbalayre',               label: 'GitHub',   icon: GithubLogo },
  { href: 'https://www.instagram.com/ben_balayre/',      label: 'Instagram', icon: InstagramLogo },
  { href: 'https://www.youtube.com/@ben_balayre',        label: 'YouTube',  icon: YouTubeLogo },
];

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-[#0c0c0c] text-white/60 py-12 px-6" id="contact">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">

        {/* Name */}
        <p className="text-white font-semibold tracking-wide text-lg">Benjamin Balayre</p>

        {/* Contact */}
        <address className="not-italic flex flex-col sm:flex-row gap-4 sm:gap-8 items-center text-sm">
          <a
            href="tel:+33782347644"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            aria-label={t('footer.phone_aria')}
          >
            <PhoneIcon className="w-4 h-4 flex-shrink-0" />
            07 82 34 76 44
          </a>
          <a
            href="mailto:benjamin@balayre.com"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            aria-label={t('footer.email_aria')}
          >
            <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
            benjamin@balayre.com
          </a>
        </address>

        {/* Socials */}
        <nav aria-label={t('footer.social_aria')}>
          <ul className="flex items-center gap-6">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group block"
                >
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-200" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Copyright */}
        <p className="text-xs text-white/30 tracking-wide">
          © {new Date().getFullYear()} Benjamin Balayre — {t('home.rights_reserved')}
        </p>
      </div>
    </footer>
  );
};
