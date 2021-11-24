import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

import useForm from './useForm';
import { useAlert } from '../alert';

const FormAlerts = () => {
  const { submitCount, isValid } = useFormikContext();
  const { http } = useForm();
  const { push } = useAlert(http.res, {
    success: () => ({ children: 'Saved' }),
  });

  useEffect(() => {
    if (!isValid) {
      push({
        dirty: true,
        theme: 'danger',
        children: 'Hmmm...you\'ve to complete the form.',
      });
    }
  }, [submitCount]);

  return <></>;
};

export default FormAlerts;
