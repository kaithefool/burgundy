import { useContext } from 'react';

import CalContext from './CalContext';

function useCal() {
  return useContext(CalContext);
}

export default useCal;
