import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

import useFormHttp from './useFormHttp';
import { useAlert } from '../alert';

const FormAlerts = () => {
  const { submitCount, isValid } = useFormikContext();
  const formHttp = useFormHttp();
  const { push } = useAlert(formHttp.res, {
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
