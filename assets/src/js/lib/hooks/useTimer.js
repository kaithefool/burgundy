import { useState, useRef } from 'react';
import {
  DateTime as dt, Interval as intvl, Duration as dur,
} from 'luxon';

import useInterval from './useInterval';
import useTimeout from './useTimeout';

/**
 * @typedef {import('luxon').DurationLikeObject} DurationLikeObject
 * @typedef {import('luxon').Duration} Duration
 * @typedef {import('./useInterval').IntervalState} IntervalState
 * @typedef {import('./useTimeout').TimeoutState} TimeoutState
 * @typedef {DurationLikeObject|number} DurationConfig
 *
 *
 * @typedef {Object} TimerState
 * @property {IntervalState} interval - The interval state.
 * @property {TimerState} timeout - The timeout state.
 * @property {Function} start - Start the timer.
 * @property {Function} reset - Reset the timer.
 * @property {string} timeLeft - The time left in human readable format
 * with i18n supported.
 */

/**
 * A React hook for setting up a timer that can be started, reset,
 * and provides the time left.
 *
 * @param {Function} onEnded - The callback to be executed when the timer ends.
 * @param {DurationConfig} duration
 * - The duration of the timer.
 * @param {boolean} [startOnInit=false] - Whether to start the timer on init.
 * @param {Object} [options] - The options for the timer.
 * @param {number} [options.interval] - The interval to update the time left.
 * @param {Function} [options.onInterval] - The callback to be executed on
 * each interval.
 *
 * @returns {TimerState}
 */

export default function useTimer(
  onEnded,
  duration,
  startOnInit = false,
  {
    interval = 1000,
    onInterval = () => {},
  } = {},
) {
  const end = useRef();
  const [timeLeft, setTimeLeft] = useState();
  const d = dur.isDuration(duration)
    ? duration
    : dur.fromObject(
      typeof duration === 'object' ? duration : { milliseconds: duration },
    );
  const count = (tail) => {
    const now = dt.now();

    if (tail === 'start') {
      end.current = now.plus(d);
    }

    setTimeLeft(
      intvl
        .fromDateTimes(now, end.current)
        .toDuration(),
    );
  };
  const i = useInterval(() => {
    count();
    onInterval();
  }, interval, startOnInit);
  const t = useTimeout(() => {
    i.abort();
    onEnded();
  }, d.toMillis(), startOnInit);

  const reset = () => {
    t.abort();
    i.abort();
  };

  const start = () => {
    reset();
    t.start();
    i.start();
    count('start');
  };

  return {
    interval: i,
    timeout: t,
    start,
    reset,
    timeLeft,
  };
}
