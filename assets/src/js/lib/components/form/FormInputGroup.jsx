import React from 'react';
import FormField from './FormField';

const FormInputGroup = ({
  children,
  inputGroupClassName = 'input-group-input',
  ...props
}) => (
  <FormField {...props}>
    {(p) => (
      <div
        className={`
            input-group ${inputGroupClassName}
            ${p.invalid ? 'is-invalid' : ''}
            ${p.valid ? 'is-valid' : ''}
        `}
      >
        {typeof children === 'function' ? children(p) : children}
      </div>
    )}
  </FormField>
);

export default FormInputGroup;
