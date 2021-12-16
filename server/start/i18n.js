const path = require('path');
const i18n = require('i18next');
const middleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');
const _ = require('lodash');

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
    },
  });

i18n.services.formatter.add('startcase', (v) => _.startCase(v));
i18n.services.formatter.add('lowercase', (v) => _.lowerCase(v));

const formatField = (value, { fieldCase = 'lowercase' } = {}) => {
  const [, fieldPath, lng] = value.match(
    new RegExp(`(.*?)(?:\\.(${
      lngs.join('|')
    }))?$`),
  );
  let str = `$t(${fieldPath}, ${fieldCase})`;

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

module.exports = middleware.handle(i18n);
