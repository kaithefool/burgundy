import { useEffect, useRef } from 'react';

/**
 * @typedef {Object} TimeoutState
 * @property {Function} start - A function to start the timeout.
 * @property {Function} abort - A function to abort the timeout.
 */

/**
 * A React hook for setting up an timeout.
 *
 * @param {Function} cb - The callback to be executed after the timeout.
 * @param {number} duration - The duration of the timeout in milliseconds.
 * @param {boolean} [startOnInit=true] - Whether to start the timeout
 * immediately.
 *
 * @returns {TimeoutState}
 */
export default function useTimeout(cb, delay, startOnInit = true) {
  const t = useRef();
  const func = useRef(cb);
  const abort = () => {
    if (t.current) clearTimeout(t.current);
  };

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  const start = () => {
    t.current = setTimeout(() => {
      func.current();
    }, delay);
  };

  useEffect(() => {
    if (cb && startOnInit) {
      start();
    }

    return abort;
  }, []);

  return { start, abort };
}
