import { useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import useComparable from './useComparable';

export default function useDebounce(fn, ...opts) {
  const func = useRef(fn);
  const debounced = useCallback(debounce((...params) => {
    func.current(...params);

    return () => { func.current = () => {}; };
  }, ...opts), useComparable(opts));

  // always update func in state changes
  // so func can use state variables
  func.current = fn;

  return debounced;
}
