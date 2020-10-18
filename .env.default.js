/**
 * To overwrite these values in your particular environment,
 * do it in /shared/.env.js
 * For details, checkout /start/env.js
 */

module.exports = {
  ROOT: 'http://localhost:3000',
  PORT: 3000,
  SECRET: 'justreadtheinstructions',
  HTTPS: false,
  DB: {
    HOST: 'localhost',
    USER: 'app',
    DATABASE: 'burgundy',
  },
  RESET_PWD: {
    MAX: '3',
    MAX_TTL: '1d',
    KEY_TTL: '10m',
  },
  MAIL: {
    HOST: '',
    PORT: '',
    USER: '',
    PASS: '',
    DEF_SENDER: '',
  },
  REDIS_URL: 'redis://127.0.0.1:6379/0',
};
