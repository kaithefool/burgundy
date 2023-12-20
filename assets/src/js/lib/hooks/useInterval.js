import { useEffect, useRef } from 'react';

/**
 * @typedef {Object} IntervalState
 * @property {Function} start - A function to start the interval.
 * @property {Function} abort - A function to abort the interval.
 */

/**
 * A React hook for setting up an interval.
 *
 * @param {Function} cb - The callback to be executed at each interval.
 * @param {number} duration - The duration of the interval in milliseconds.
 * @param {boolean} [startOnInit=true] - Whether to start the interval
 * immediately.
 *
 * @returns {IntervalState}
 */
export default function useInterval(cb, duration, startOnInit = true) {
  const t = useRef();
  const func = useRef(cb);
  const abort = () => {
    if (t.current) clearInterval(t.current);
  };

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  const start = () => {
    t.current = setInterval(() => {
      func.current();
    }, duration);
  };

  useEffect(() => {
    if (cb && startOnInit) {
      start();
    }

    return abort;
  }, []);

  return { start, abort };
}
