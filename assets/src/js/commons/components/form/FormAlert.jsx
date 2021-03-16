import React from 'react';
import { useFormikContext } from 'formik';

import { useAlert } from '../alert';
import useFormHttp from './useFormHttp';

const FormAlert = () => {
  const { push } = useAlert();
  const { res } = useFormHttp();
  const { errors, touched } = useFormikContext();

  return <></>;
};

export default FormAlert;
