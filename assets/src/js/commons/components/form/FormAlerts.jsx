import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import useForm from './useForm';
import { useAlert } from '../alert';

const FormAlerts = ({ opts }) => {
  const { t } = useTranslation();
  const { submitCount, isValid } = useFormikContext();
  const { http } = useForm();
  const { push } = useAlert(http.res, opts || {
    success: () => ({ children: t('res.saved') }),
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
