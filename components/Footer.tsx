import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

import { LinkedinLogo } from '~~/public/assets/svg/LinkedinLogo';
import { GithubLogo } from '~~/public/assets/svg/GithubLogo';
import { InstagramLogo } from '~~/public/assets/svg/InstagramLogo';
import { YouTubeLogo } from '~~/public/assets/svg/YouTubeLogo';

const socials = [
  {
    href: 'https://www.linkedin.com/in/Benjamin-balayre',
    label: 'Linkedin of Benjamin Balayre',
    icon: LinkedinLogo,
  },
  {
    href: 'https://github.com/BenjaminBalayre',
    label: 'Github of Benjamin Balayre',
    icon: GithubLogo,
  },
  {
    href: 'https://www.instagram.com/benjaminbalayre/',
    label: 'Instagram of Benjamin Balayre',
    icon: InstagramLogo,
  },
  {
    href: 'https://www.youtube.com/channel/UC9J9Z9Z9J9Z9J9Z9J9Z9',
    label: 'Youtube of Benjamin Balayre',
    icon: YouTubeLogo,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-base-100 shadow-xl shadow-primary text-center md:py-8 py-4">
      <address className="flex justify-center mb-4 flex-col md:flex-row text-center items-center">
        <a
          href="tel:+33782347644"
          target="_blank"
          rel="noopener noreferrer"
          className="transition flex text-accent-content hover:text-primary md:mr-5"
          aria-label="Phone number of Benjamin Balayre"
        >
          <PhoneIcon className="w-6 h-6 mr-2 hidden md:block" />
          07 82 34 76 44
        </a>
        <a
          href="mailto:benjamin@balayre.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition flex text-accent-content hover:text-primary md:ml-5"
          aria-label="Email of Benjamin Balayre"
        >
          <EnvelopeIcon className="w-6 h-6 mr-2 hidden md:block" />
          benjamin@balayre.com
        </a>
      </address>
      <nav>
        <ul className="flex justify-center mb-8 space-x-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon className="w-6 h-6 transition text-accent-content hover:text-primary" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="text-xs md:text-sm">
        Copyright © {new Date().getFullYear()} Benjamin Balayre. All Rights Reserved.
      </p>
    </footer>
  );
};