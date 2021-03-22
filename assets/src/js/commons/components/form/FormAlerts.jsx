import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import useFormHttp from './useFormHttp';
import { useAlert } from '../alert';

const FormAlerts = () => {
  const [changed, setChanged] = useState(false);
  const { isValidating, errors } = useFormikContext();
  const formHttp = useFormHttp();
  const { push } = useAlert(formHttp);

  useEffect(() => {
    if (
      changed
      && isValidating === false
      && Object.keys(errors).length
    ) {
      push({
        dirty: true,
        theme: 'danger',
        children: 'Hmmm...you\'ve to complete the form.',
      });
    }

    setChanged(true);
  }, [isValidating]);

  return <></>;
};

export default FormAlerts;
