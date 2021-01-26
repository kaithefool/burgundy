import { useState } from 'react';

let k = 0;

export default function useUniqKey(prefix = '') {
  const [id] = useState(() => { k += 1; return `${prefix}${k}`; });

  return id;
}
