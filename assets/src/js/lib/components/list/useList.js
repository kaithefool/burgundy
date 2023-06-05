import { useContext, useEffect } from 'react';

import ListContext from './ListContext';

function useList({
  onRefresh = () => {},
} = {}) {
  const ctx = useContext(ListContext);
  const { refreshCount } = ctx;

  useEffect(() => {
    if (refreshCount > 1) onRefresh();
  }, [refreshCount]);

  return ctx;
}

export default useList;
