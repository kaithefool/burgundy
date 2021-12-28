import React from 'react';
import { useTranslation } from 'react-i18next';

import FormInput from './FormInput';

const FormSelect = ({
  children,
  ...props
}) => {
  const { t } = useTranslation();

  const c = Array.isArray(children)
    ? children.map((o) => (
      <option key={o} value={o}>
        {t(o, o)}
      </option>
    )) : children;

  return (
    <FormInput
      as="select"
      fieldClassName="form-select"
      {...props}
    >
      {c}
    </FormInput>
  );
};

export default FormSelect;
