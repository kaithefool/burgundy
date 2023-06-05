import { useEffect, useRef } from 'react';

export default function useTimeout(cb, delay, startOnInit = true) {
  const t = useRef();
  const func = useRef(cb);
  const abort = () => {
    if (t.current) clearTimeout(t.current);
  };

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  const start = () => {
    t.current = setTimeout(() => {
      func.current();
    }, delay);
  };

  useEffect(() => {
    if (cb && startOnInit) {
      start();
    }

    return abort;
  }, []);

  return { start, abort };
}
