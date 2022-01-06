import { useContext } from 'react';

import TabsContext from './TabsContext';

function useList() {
  return useContext(TabsContext);
}

export default useList;
