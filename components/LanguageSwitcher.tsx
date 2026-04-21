import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const isEnglish = router.locale === 'en';

  const changeLanguage = () => {
    const newLocale = isEnglish ? 'fr' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <button
      onClick={changeLanguage}
      aria-label={t('header.switch_language')}
      className={`
        relative w-16 h-9 rounded-full p-1 cursor-pointer transition-colors duration-300 min-h-[36px]
        ${isEnglish ? 'bg-primary' : 'bg-neutral'}
      `}
    >
      <div
        className={`
          w-7 h-7 bg-base-100 rounded-full shadow-md flex items-center justify-center text-sm
          transform transition-transform duration-300
          ${isEnglish ? 'translate-x-[30px]' : 'translate-x-0'}
        `}
        aria-hidden="true"
      >
        {isEnglish ? '🇬🇧' : '🇫🇷'}
      </div>
    </button>
  );
};

export default LanguageSwitcher;
