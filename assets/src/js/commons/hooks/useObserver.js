import { useEffect, useRef } from 'react';

function useObserver(Observer, ref, cb, opts) {
  const func = useRef();

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  useEffect(() => {
    const el = ref.current;
    let observer;

    if (el) {
      observer = new Observer(
        ([entry]) => func.current(entry),
      );

      observer.observe(ref.current, opts);
    }

    return () => observer && observer.disconnect();
  }, [ref.current]);
}

export function useResizeObserver(...args) {
  return useObserver(ResizeObserver, ...args);
}

export function useMutationObserver(...args) {
  return useObserver(MutationObserver, ...args);
}

export function useIntersectionObserver(...args) {
  return useObserver(IntersectionObserver, ...args);
}

export function useVisible(ref, cb, opts) {
  return useIntersectionObserver(
    ref,
    (entry) => cb(entry.isIntersecting, entry),
    opts,
  );
}

export default useObserver;
