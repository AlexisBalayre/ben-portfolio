import { faInstagram, faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

export const Footer = () => {
  return (
    <footer className="bg-base-100 shadow-xl shadow-primary text-center">
      <address className="flex justify-center mt-8 mb-4 flex-col md:flex-row text-center items-center">
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
      <nav className="flex justify-center">
        <ul className="flex justify-center mb-4">
          <li className="mr-4">
            <a
              href="https://www.linkedin.com/in/Benjamin-balayre"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin of Benjamin Balayre"
            >
              <FontAwesomeIcon icon={faLinkedin} className="fa-2x transition text-accent-content hover:text-primary" />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://github.com/BenjaminBalayre"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github of Benjamin Balayre"
            >
              <FontAwesomeIcon icon={faGithub} className="fa-2x transition text-accent-content hover:text-primary" />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.instagram.com/benjaminbalayre/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram of Benjamin Balayre"
            >
              <FontAwesomeIcon icon={faInstagram} className="fa-2x transition text-accent-content hover:text-primary" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UC9J9Z9Z9J9Z9J9Z9J9Z9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube of Benjamin Balayre"
            >
              <FontAwesomeIcon icon={faYoutube} className="fa-2x transition text-accent-content hover:text-primary" />
            </a>
          </li>
        </ul>
      </nav>
      <p className="text-center text-xs md:text-sm">Copyright © 2024 Benjamin Balayre. All Rights Reserved.</p>
    </footer>
  );
};