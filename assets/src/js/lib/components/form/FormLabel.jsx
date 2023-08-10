import React from 'react';
import { useTranslation } from 'react-i18next';

const FormLabel = ({
  name = '',
  className = 'form-label',
  explainText,
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
      {explainText && ` (${explainText})`}
    </label>
  );
};

export default FormLabel;
