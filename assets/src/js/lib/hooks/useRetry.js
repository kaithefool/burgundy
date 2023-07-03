import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useTimer from './useTimer';

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
