import { useEffect, useRef } from 'react';

export default function useDidUpdate(fn, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return fn();

    didMount.current = true;

    return undefined;
  }, deps);
}
