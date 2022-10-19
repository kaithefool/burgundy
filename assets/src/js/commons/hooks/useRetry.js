import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useTimer from './useTimer';

export default function useRetry({
  wait = { seconds: 30 },
  waitAfter = 2,
  max = 6,
} = {}) {
  const { t } = useTranslation();
  const [paused, setPaused] = useState(false);
  const count = useRef(0);
  const maxReached = count.current >= max;
  const needWait = count.current >= waitAfter;

  const { start, timeLeft } = useTimer(
    () => setPaused(false),
    wait,
    false,
  );
  const attempt = () => {
    if (needWait) start();
    if (needWait || maxReached) setPaused(true);

    count.current += 1;
  };

  const error = paused && (
    maxReached
      ? t('res.retryMaxReached')
      : t('res.retryAfter', { seconds: timeLeft.toFormat('s') })
  );

  return {
    paused,
    timeLeft,
    attempt,
    error,
  };
}
