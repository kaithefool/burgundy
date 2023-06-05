import { useContext } from 'react';

import FilContext from './FilContext';

function useFil() {
  return useContext(FilContext);
}

export default useFil;
