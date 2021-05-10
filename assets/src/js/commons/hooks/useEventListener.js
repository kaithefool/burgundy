import { useCallback, useEffect } from 'react';

export default function useEventListener(
  target,
  eventType,
  cb,
  deps,
) {
  const handler = useCallback(cb, deps);

  useEffect(() => {
    target.addEventListener(eventType, handler);

    return () => {
      target.removeEventListener(eventType, handler);
    };
  }, [cb]);
}
