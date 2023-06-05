import React from 'react';
import { useTranslation } from 'react-i18next';

const FormLabel = ({
  name = '',
  className = 'form-label',
  children,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <label
      className={className}
      {...props}
    >
      {
        children
        || t('field', {
          path: name,
          fieldCase: 'titleize',
          fieldArrayPath: false,
        })
      }
    </label>
  );
};

export default FormLabel;
