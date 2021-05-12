import { useCallback, useEffect } from 'react';

export default function useEventListener(
  target,
  eventType,
  cb,
  deps = [],
) {
  const handler = useCallback(cb, [
    Boolean(cb),
    ...deps,
  ]);

  useEffect(() => {
    if (handler) {
      target.addEventListener(eventType, handler);
    }

    return () => {
      if (handler) {
        target.removeEventListener(eventType, handler);
      }
    };
  }, [handler]);
}
