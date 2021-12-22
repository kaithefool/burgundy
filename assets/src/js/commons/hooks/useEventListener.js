import { useRef, useEffect } from 'react';

export default function useEventListener(
  target,
  eventType,
  cb,
) {
  const func = useRef();
  const handl = useRef(function handler(...args) {
    func.current.apply(this, args);
  });

  // always update func in state changes
  // so func can use state variables
  func.current = cb;

  useEffect(() => {
    target.addEventListener(eventType, handl.current);

    return () => {
      target.removeEventListener(eventType, handl.current);
    };
  }, []);
}
