const path = require('path');
const i18n = require('i18next');
const middleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');
const inflect = require('inflect');

const { FILE_STORAGE_LOCALES, LNG, LNG_LABEL } = process.env;
const storage = path.resolve(__dirname, '../../', FILE_STORAGE_LOCALES);

const lngs = LNG.split(',');
const lngLabels = LNG_LABEL.split(',');

i18n
  .use(middleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    lowerCaseLng: true,
    supportedLngs: lngs,
    fallbackLng: lngs[0],
    ns: ['common', 'glossary'],
    fallbackNS: ['glossary'],
    caches: false,
    backend: {
      loadPath: `${storage}/{{lng}}/{{ns}}.json`,
    },
    interpolation: {
      escapeValue: false, // we are not going to i18n any user input
      skipOnVariables: false,
    },
  });

i18n.services.formatter.add('singularize', (v) => inflect.singularize(v));
i18n.services.formatter.add('titleize', (v) => inflect.titleize(v));
i18n.services.formatter.add(
  'humanize',
  (v) => inflect.humanize(v).toLowerCase(),
);

const formatField = (value, {
  fieldCase = 'lowercase',
  fieldArrayPath = true, // include field parents in label?
} = {}) => {
  const [, fieldPath, lng] = value.match(
    new RegExp(`(.*?)(?:\\.(${
      lngs.join('|')
    }))?$`),
  );
  let str = `$t(${fieldPath}, ${fieldCase})`;

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

const i18nMid = middleware.handle(i18n);

module.exports = (req, res, next) => {
  // helper function
  req.pickLng = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;

    const { language, languages } = req.i18n;
    const lns = [language, ...languages];

    return obj[lns.find((l) => obj[l])];
  };

  return i18nMid(req, req, next);
};
