import { useEffect, useRef } from 'react';

export default function useTimeout(cb, delay) {
  const t = useRef();
  const func = useRef(cb);
  const abort = () => {
    if (t.current) clearTimeout(t.current);
  };

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  useEffect(() => {
    if (cb) {
      t.current = setTimeout(() => {
        func.current();
      }, delay);
    }

    return abort;
  }, []);

  return { abort };
}
