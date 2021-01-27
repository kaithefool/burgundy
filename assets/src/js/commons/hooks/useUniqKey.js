import { useState } from 'react';

let k = 0;

export default function useUniqKey(prefix = '') {
  const newKey = () => { k += 1; return `${prefix}${k}`; };
  const [key] = useState(newKey);

  return [key, newKey];
}
