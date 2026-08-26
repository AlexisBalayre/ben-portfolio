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

  // La cible fait 44 px de haut, la pastille en garde 36 : le doigt vise large
  // sans que le commutateur grossisse dans un header de 56 px.
  return (
    <button
      onClick={changeLanguage}
      aria-label={t('header.switch_language')}
      className="grid h-11 cursor-pointer place-items-center rounded-full"
    >
      <span
        className={`relative block h-9 w-14 rounded-full p-1 transition-colors duration-300 sm:w-16 ${
          isEnglish ? 'bg-primary' : 'bg-neutral'
        }`}
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full bg-base-100 text-sm shadow-md transition-transform duration-300 ${
            isEnglish ? 'translate-x-5 sm:translate-x-7' : 'translate-x-0'
          }`}
          aria-hidden="true"
        >
          {isEnglish ? '🇬🇧' : '🇫🇷'}
        </span>
      </span>
    </button>
  );
};

export default LanguageSwitcher;
