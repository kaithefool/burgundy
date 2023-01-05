import { useCallback, useRef, useState } from 'react';
import capitalize from 'lodash/capitalize';

function useObserver(...args) {
  const observes = Array.isArray(args[0]) ? args[0] : [args];

  const obs = useRef();
  // always update func in state changes
  // so func can use state variables
  obs.current = observes;

  const [observers] = useState(() => (
    observes.map(([type], i) => (
      new window[`${capitalize(type)}Observer`](
        ([entry]) => obs.current[i][1](entry),
      )
    ))
  ));

  return useCallback((el) => {
    if (el) {
      observers.forEach((obr, i) => (
        obr.observe(el, obs.current[i][2])
      ));
    } else {
      observers.forEach((obr) => (
        obr.disconnect()
      ));
    }
  }, []);
}

export function useVisible(cb, opts) {
  return useObserver(
    'intersection',
    (entry) => cb(entry.isIntersecting, entry),
    opts,
  );
}

export default useObserver;
