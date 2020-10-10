import { useRef } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * Hook to aid comparing more complicated state changes,
 * such as objects
 */
export default function useComparable(value) {
  const ref = useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
