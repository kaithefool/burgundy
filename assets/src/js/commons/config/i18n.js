import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Settings } from 'luxon';

import env from './env';

let lngs = [];

// init
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lowerCaseLng: true,
    supportedLngs: env.lngs,
    fallbackLng: env.lngs[0],
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: { useSuspense: false },
  }, () => {
    const { language, languages } = i18n;

    // for lang value picker
    lngs = [language, ...languages];

    // for date format
    Settings.defaultLocale = language;
  });

i18n.pickLng = (obj) => obj[lngs.find((l) => obj[l])];

export default i18n;
