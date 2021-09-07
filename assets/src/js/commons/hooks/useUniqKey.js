import { useState } from 'react';
import { nanoid } from 'nanoid';

const newKey = (prefix = 't-') => `${prefix}${nanoid()}`;

export { newKey };

export default function useUniqKey(prefix) {
  const [key] = useState(() => newKey(prefix));

  return [key, newKey];
}
