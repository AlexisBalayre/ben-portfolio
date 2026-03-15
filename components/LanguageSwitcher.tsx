import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const isEnglish = router.locale === 'en';

  const changeLanguage = () => {
    const newLocale = isEnglish ? 'fr' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <button
      onClick={changeLanguage}
      aria-label={isEnglish ? 'Switch to French' : 'Switch to English'}
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
        aria-hidden="true"
      >
        {isEnglish ? '🇬🇧' : '🇫🇷'}
      </div>
    </button>
  );
};

export default LanguageSwitcher;
