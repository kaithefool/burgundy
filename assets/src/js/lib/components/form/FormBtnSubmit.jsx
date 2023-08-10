import React, { useEffect } from 'react';
import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import BtnHttp from '../btns/BtnHttp';
import useForm from './useForm';

const FormBtnSubmit = ({
  children,
  icon = faSave,
  successIcon = faCheck,
  onlyValid = true,
  onlyDirty = false,
  className = 'btn-primary',
  name,
  value,
  ...props
}) => {
  const { t } = useTranslation();
  const { http, attemp } = useForm();
  const { dirty, isValid, isSubmitting } = useFormikContext();
  const saved = !dirty && http.res.status === 'success';
  const i = icon && (saved && successIcon ? successIcon : icon);

  useEffect(() => {
    if (!isSubmitting && attemp.current[name] === value) {
      delete attemp.current[name];
    }
  }, [name, isSubmitting]);

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
      {...name && {
        onClick: () => { attemp.current[name] = value; },
      }}
      {...props}
    >
      {children ?? t(saved ? 'res.saved' : 'save')}
    </BtnHttp>
  );
};

export default FormBtnSubmit;
