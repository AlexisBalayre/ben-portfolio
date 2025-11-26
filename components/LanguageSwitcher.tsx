import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const isEnglish = router.locale === 'en';

  const changeLanguage = () => {
    const newLocale = isEnglish ? 'fr' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div
      onClick={changeLanguage}
      className={`
        relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300
        ${isEnglish ? 'bg-primary' : 'bg-neutral'}
      `}
    >
      <div
        className={`
          w-6 h-6 bg-base-100 rounded-full shadow-md flex items-center justify-center text-sm
          transform transition-transform duration-300
          ${isEnglish ? 'translate-x-8' : 'translate-x-0'}
        `}
      >
        {isEnglish ? '🇬🇧' : '🇫🇷'}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
