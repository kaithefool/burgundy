import React from 'react';

import FormInput from './FormInput';

const FormCheck = ({
  className = 'mb-3',
  type = 'checkbox',
  ...props
}) => (
  <FormInput
    className={`
      ${className}
      form-check
      ${type === 'switch' ? 'form-switch' : ''}
    `}
    fieldClassName="form-check-input"
    labelClassName="form-check-label"
    appendLabel
    type={type === 'switch' ? 'checkbox' : type}
    {...props}
  />
);

export default FormCheck;
