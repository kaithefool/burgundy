const path = require('path');
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');

const { fileStorage } = require('./env');

const storage = path.resolve(__dirname, '../', fileStorage.locales);

i18next
  .use(middleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    lowerCaseLng: true,
    supportedLngs: ['en', 'zh-hant'],
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      caches: ['cookie'],
    },
    backend: {
      loadPath: `${storage}/{{lng}}/{{ns}}.json`,
    },
  });

module.exports = middleware.handle(i18next);
