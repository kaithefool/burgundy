import React from 'react';

import FormInput from './FormInput';

const FormCheck = ({
  className = 'mb-3',
  type = 'checkbox',
  button = false,
  ...props
}) => (
  <FormInput
    className={`
      ${className}
      form-check
      ${type === 'switch' ? 'form-switch' : ''}
    `}
    fieldClassName={button ? 'btn-check' : 'form-check-input'}
    labelClassName={
      button
        ? `btn ${button || 'btn-primary'}` : 'form-check-label'
    }
    appendLabel
    type={type === 'switch' ? 'checkbox' : type}
    {...button && { noWrap: true }}
    {...props}
  />
);

export default FormCheck;
