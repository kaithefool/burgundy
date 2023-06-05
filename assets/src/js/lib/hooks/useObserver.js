import { useCallback, useRef, useState } from 'react';
import capitalize from 'lodash/capitalize';

function useObserver(...args) {
  const el = useRef();
  const observes = Array.isArray(args[0]) ? args[0] : [args];

  const obs = useRef();
  // always update func in state changes
  // so func can use state variables
  obs.current = observes;

  const [observers] = useState(() => (
    observes.map(([type], i) => (
      new window[`${capitalize(type)}Observer`](
        ([entry]) => obs.current[i][1](entry, el.current),
      )
    ))
  ));

  const ref = useCallback((node) => {
    el.current = node;

    if (node) {
      observers.forEach((obr, i) => (
        obr.observe(node, obs.current[i][2])
      ));
    } else {
      observers.forEach((obr) => (
        obr.disconnect()
      ));
    }
  }, []);

  return { ref, el };
}

export function useVisible(cb, opts) {
  return useObserver(
    'intersection',
    (entry) => cb(entry.isIntersecting, entry),
    opts,
  );
}

export default useObserver;
