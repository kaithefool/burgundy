import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useTimer from './useTimer';

/**
 * @typedef {import('./useTimer').DurationConfig} DurationConfig
 *
 * @typedef {Object} RetryState
 * @property {boolean} paused - Whether the retrying is currently paused.
 * @property {string} timeLeft - The time left until the next retry attempt
 * in human readable format.
 * @property {Function} attempt - Attempt a retry.
 * @property {string} error - The error message to display.
 *
 *
 * @typedef {Object} RetryOptions
 * @property {DurationConfig} [wait] - The duration to wait before
 * retrying.
 * @property {number} [waitAfter] - The number of attempts after
 * which to start the wait timer.
 * @property {number} [max] - The maximum number of retry attempts.
 */

/**
 * A React hook for implementing retry logic.
 *
 * @param {RetryOptions} options
 *
 * @returns {RetryState}
 */
export default function useRetry({
  wait = { seconds: 30 },
  waitAfter = 3,
  max = 6,
} = {}) {
  const { t } = useTranslation();
  const [paused, setPaused] = useState(false);
  const count = useRef(0);

  const { start, reset, timeLeft } = useTimer(
    () => setPaused(false),
    wait,
    false,
  );
  const attempt = () => {
    count.current += 1;

    if (count.current >= max) {
      reset();
      setPaused(true);
    } else if (count.current > waitAfter) {
      start();
      setPaused(true);
    }
  };

  const error = count.current >= max
    ? t('res.retryMaxReached')
    : paused && t('res.retryAfter', {
      seconds: timeLeft.toFormat('s'),
    });

  return {
    paused,
    timeLeft,
    attempt,
    error,
  };
}
