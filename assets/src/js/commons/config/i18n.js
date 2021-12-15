import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Settings as LuxonSetting } from 'luxon';
import Cookies from 'js-cookie';

import env from './env';

const setCookie = (lng) => {
  Cookies.set('i18next', lng, {
    expires: 365,
    sameSite: 'strict',
    secure: window.location.protocol === 'https:',
  });
};

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
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// lang value picker
i18n.pickLng = (obj) => {
  const { language, languages } = i18n || {};
  const lngs = [language, ...languages];

  return obj[lngs.find((l) => obj[l])];
};

i18n.on('languageChanged', (lng) => {
  setCookie(lng);
  LuxonSetting.defaultLocale = lng;
});

export default i18n;
