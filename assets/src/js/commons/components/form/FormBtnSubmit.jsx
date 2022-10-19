import React from 'react';
import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import BtnHttp from '../btns/BtnHttp';
import useForm from './useForm';

const FormBtnSubmit = ({
  children,
  icon = faSave,
  onlyValid = true,
  onlyDirty = true,
  className = 'btn-primary',
  ...props
}) => {
  const { t } = useTranslation();
  const { http } = useForm();
  const { dirty, isValid, isSubmitting } = useFormikContext();
  const saved = !dirty && http.res.status === 'success';
  const i = icon && (saved ? faCheck : icon);

  return (
    <BtnHttp
      res={http.res}
      type="submit"
      icon={i}
      className={className}
      disabled={(
        (onlyDirty && !dirty)
        || (onlyValid && !isValid)
        || isSubmitting
      )}
      {...props}
    >
      {children || t(saved ? 'res.saved' : 'save')}
    </BtnHttp>
  );
};

export default FormBtnSubmit;
