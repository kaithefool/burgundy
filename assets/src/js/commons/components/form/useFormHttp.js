import { useContext } from 'react';

import FormHttpContext from './FormHttpContext';

function useFormHttp() {
  return useContext(FormHttpContext);
}

export default useFormHttp;
