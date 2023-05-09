import React from 'react';
import { useTranslation } from 'react-i18next';

const FormLabel = ({
  name = '',
  children,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <label
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
