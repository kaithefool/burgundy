import { useContext } from 'react';

import FetchContext from './FetchContext';

function useFetch() {
  return useContext(FetchContext);
}

export default useFetch;
