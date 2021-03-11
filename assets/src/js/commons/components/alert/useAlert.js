import { useContext } from 'react';

import AlertContext from './AlertContext';

function useAlert() {
  const ctx = useContext(AlertContext);

  

  return ctx;
}

export default useAlert;
