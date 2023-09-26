import { useState } from 'react';

export default function useStorage(key, initialValue, type = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage;
  const [state, setState] = useState(() => {
    let s;

    try {
      s = JSON.parse(storage.getItem(key));
    } catch (e) { /* do nothing */ }

    return s ?? (
      typeof initialValue === 'function' ? initialValue() : initialValue
    );
  });

  return [
    state,
    (draft) => {
      setState(draft);
      storage.setItem(key, JSON.stringify(draft));
    },
  ];
}
