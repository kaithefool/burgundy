import { useContext } from 'react';

import FormContext from './FormContext';

function useForm() {
  return useContext(FormContext);
}

export default useForm;
