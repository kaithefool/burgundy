import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Settings as LuxonSetting } from 'luxon';
import Cookies from 'js-cookie';
import inflect from 'inflect';

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
    ns: ['common', 'glossary'],
    fallbackNS: ['glossary'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// on language changed
i18n.on('languageChanged', (lng) => {
  setCookie(lng);
  LuxonSetting.defaultLocale = lng;
});

// helper functions
i18n.pickLng = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  const { language, languages } = i18n;
  const lngs = [language, ...languages];

  return obj[lngs.find((l) => obj[l])];
};

// formats
i18n.services.formatter.add('singularize', (v) => inflect.singularize(v));
i18n.services.formatter.add('titleize', (v) => inflect.titleize(v));
i18n.services.formatter.add(
  'humanize',
  (v) => inflect.humanize(v).toLowerCase(),
);

const formatField = (value, {
  fieldCase = 'humanize',
  fieldArrayPath = true, // include field parents in label?
} = {}) => {
  const { lngs, lngLabels } = env;
  // extract lng path
  const [, path, lng] = value.match(
    new RegExp(`(.*?)(?:\\.(${
      lngs.join('|')
    }))?$`),
  );
  let str = `$t(${path}, ${fieldCase})`;

  const arrSegments = path.match(
    fieldArrayPath
      ? /^(.+?)[[.](\d+)]?(?:\.(.+))?$/
      : /^(?:.+[[.]\d+]?\.)?(.+?)[[.](\d+)]?(?:\.(.+))?$/,
  );

  // array fields
  if (arrSegments) {
    const [, parent, index, child] = arrSegments;

    if (!fieldArrayPath && child) {
      str = `$t(${child}, ${fieldCase})`;
    } else {
      str = `$t(${
        child ? 'arrayObjField' : 'arrayField'
      }, ${
        JSON.stringify({
          parent,
          index: Number(index) + 1,
          child,
        })
      })`;
    }
  }

  if (lng) {
    str = `${str}(${
      lngLabels[lngs.indexOf(lng)]
    })`;
  }

  return str;
};

i18n.services.formatter.add('field', (value, lng, opts) => (
  Array.isArray(value)
    ? value.map((v) => formatField(v, opts))
    : formatField(value, opts)
));

export default i18n;
