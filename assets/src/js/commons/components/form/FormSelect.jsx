import React from 'react';
import { useTranslation } from 'react-i18next';
import startCase from 'lodash/startCase';

import FormInput from './FormInput';

const FormSelect = ({
  children,
  ...props
}) => {
  const { t } = useTranslation();

  const cc = Array.isArray(children)
    && children.every((c) => typeof c === 'string')
    ? children.map((o) => (
      <option key={o} value={o}>
        {t(o, startCase(o))}
      </option>
    )) : children;

  return (
    <FormInput
      as="select"
      fieldClassName="form-select"
      {...props}
    >
      {cc}
    </FormInput>
  );
};

export default FormSelect;
