import React, { createContext } from 'react';

/**
 * @typedef {import('../../hooks/useHttp').HttpState} HttpState
 * @typedef {import('@fortawesome/fontawesome-svg-core')
 * .IconDefinition} IconDefinition
 */

/**
 * @typedef {Object} DeferRenderConfig
 * @property {IconDefinition} [icon] - FontAwesome icon
 * @property {string} [theme] - bootstrap theme
 * @property {Number} [expires] - alert auto dismiss in milliseconds
 * @property {boolean} [dismissable=true] - show dismiss button
 * @property {(http: HttpState) => React.ReactNode} [render]
 */

/**
 * @typedef {Object} DeferStatusConfig
 * @property {DeferRenderConfig|boolean} [pending]
 * @property {DeferRenderConfig|boolean} [success=false]
 * @property {DeferRenderConfig|boolean} [error]
 * @property {DeferRenderConfig|boolean} [canceled=false]
 */

/**
 * @typedef {Object} DeferConfig
 * @property {DeferStatusConfig} [alert]
 * @property {DeferStatusConfig} [status]
 */

/**
 * @typedef {Object} Log
 * @property {HttpState} http
 * @property {DeferConfig} config
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
