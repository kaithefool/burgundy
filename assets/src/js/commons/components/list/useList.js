import { useContext } from 'react';

import ListContext from './ListContext';

function useList() {
  return useContext(ListContext);
}

export default useList;
