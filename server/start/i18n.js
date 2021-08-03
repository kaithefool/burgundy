const path = require('path');
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');

const { FILE_STORAGE_LOCALES, LANG } = process.env;

const storage = path.resolve(__dirname, '../../', FILE_STORAGE_LOCALES);

i18next
  .use(middleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    lowerCaseLng: true,
    supportedLngs: LANG.split(','),
    fallbackLng: LANG.split(',')[0],
    defaultNS: 'common',
    detection: {
      caches: ['cookie'],
    },
    backend: {
      loadPath: `${storage}/{{lng}}/{{ns}}.json`,
    },
  });

module.exports = middleware.handle(i18next);
