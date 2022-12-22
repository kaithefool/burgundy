import { useEffect, useRef } from 'react';

export default function useVisible(ref, cb, opts) {
  const func = useRef();

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => func.current(entry.isIntersecting, entry),
      opts,
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
}
