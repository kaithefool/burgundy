import { useEffect, useRef } from 'react';

export default function useTimeout(cb, delay) {
  const t = useRef();

  const abort = () => {
    if (t.current) clearTimeout(t.current);
  };

  useEffect(() => {
    if (cb) {
      t.current = setTimeout(cb, delay);
    }

    return abort;
  }, []);

  return { abort };
}
