import React from 'react';
import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useFormikContext } from 'formik';

import BtnHttp from '../btns/BtnHttp';
import useFormHttp from './useFormHttp';

const FormBtnSubmit = ({
  children,
  icon = faSave,
  onlyValid = true,
  className = 'btn-primary',
  ...props
}) => {
  const { res } = useFormHttp();
  const { dirty, isValid, isSubmitting } = useFormikContext();
  const saved = !dirty && res.status === 'success';

  return (
    <BtnHttp
      res={res}
      type="submit"
      icon={saved ? faCheck : icon}
      className={className}
      disabled={!dirty || (onlyValid && !isValid) || isSubmitting}
      {...props}
    >
      {children || (saved ? 'Saved' : 'Save')}
    </BtnHttp>
  );
};

export default FormBtnSubmit;
