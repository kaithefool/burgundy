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
  successIcon = faCheck,
  onlyValid = true,
  onlyDirty = false,
  className = 'btn-primary',
  confirm,
  name,
  value,
  ...props
}) => {
  const { t } = useTranslation();
  const { http, attemp } = useForm();
  const {
    dirty, isValid, isSubmitting, submitForm,
  } = useFormikContext();
  const saved = !dirty && http.res.status === 'success';
  const i = icon && (saved && successIcon ? successIcon : icon);

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
        onClick: () => { attemp({ [name]: value }); },
      }}
      confirm={confirm && {
        onConfirm: (values) => {
          attemp({
            ...values,
            ...name && { [name]: value },
          });
          submitForm();
        },
        ...confirm,
      }}
      {...props}
    >
      {children ?? t(saved ? 'res.saved' : 'save')}
    </BtnHttp>
  );
};

export default FormBtnSubmit;
