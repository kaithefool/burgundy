import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Settings } from 'luxon';

import env from './env';

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
  }, () => {
    // for date format
    Settings.defaultLocale = i18n.language;
  });

// lang value picker
i18n.pickLng = (obj) => {
  const { language, languages } = i18n || {};
  const lngs = [language, ...languages];

  return obj[lngs.find((l) => obj[l])];
};

export default i18n;
