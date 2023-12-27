import React, { createContext } from 'react';

/**
 * @typedef {import('../../hooks/useHttp').HttpState} HttpState
 * @typedef {import('@fortawesome/fontawesome-svg-core')
 * .IconDefinition} IconDefinition
 */

/**
 * @typedef {Object} Log
 * @property {HttpState} http
 * @property {string} theme - bootstrap theme
 * @property {IconDefinition} icon
 * @property {Number} expires - in milliseconds
 * @property {(http: HttpState) => React.ReactNode} children
 */

export default createContext({
  /** @type {Log[]} */
  logs: [],

  /** @type {(http: HttpState) => void} */
  add: () => {},
  /** @type {(id: string) => void} */
  remove: () => {},
  /** @type {() => void} */
  clean: () => {},
});
