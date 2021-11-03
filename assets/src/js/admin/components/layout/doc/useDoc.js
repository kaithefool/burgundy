import { useContext } from 'react';

import DocContext from './DocContext';

function useList() {
  return useContext(DocContext);
}

export default useList;
