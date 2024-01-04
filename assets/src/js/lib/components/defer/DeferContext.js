import React, { createContext } from 'react';

/**
 * @typedef {import('../../hooks/useHttp').HttpState} HttpState
 * @typedef {import('../../hooks/useHttp').HttpResponse} HttpResponse
 * @typedef {import('@fortawesome/fontawesome-svg-core')
 * .IconDefinition} IconDefinition
 */

/**
 * @typedef {Object} Log
 * @property {HttpState} http
 * @property {string} [className] - Additional classnames
 * @property {IconDefinition} [icon] - FontAwesome icon
 * @property {string} [theme] - Bootstrap theme
 * @property {Number} [expires] - Alert auto dismiss in milliseconds
 * @property {boolean} [dismissable=true] - Show dismiss button
 * @property {boolean} [progress=true] - Show progress in percent
 * @property {(http: HttpState) => React.ReactNode} [message]
 */

/**
 * @typedef {Object} DeferStatusConfig
 * @property {Log|boolean} [pending]
 * @property {Log|boolean} [success=false]
 * @property {Log|boolean} [error]
 * @property {Log|boolean} [canceled=false]
 */

/**
 * @typedef {Object} DeferConfig
 * @property {DeferStatusConfig|boolean} [alert]
 * @property {DeferStatusConfig|boolean} [status]
 */

export default createContext({
  /** @type {Log[]} */
  alerts: [],
  /** @type {Log} */
  status: {},

  /** @type {(http: HttpState, config: DeferConfig) => void} */
  add: () => {},
  /** @type {(id: string) => void} */
  remove: () => {},
  /** @type {() => void} */
  clean: () => {},
});
