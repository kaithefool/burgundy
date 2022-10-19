import { useState, useRef } from 'react';
import {
  DateTime as dt, Interval as intvl, Duration as dur,
} from 'luxon';

import useInterval from './useInterval';
import useTimeout from './useTimeout';

export default function useTimer(cb, duration, startOnInit, {
  interval = 1000,
  onInterval = () => {},
} = {}) {
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
    cb();
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
