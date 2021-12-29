import React from 'react';
import FormField from './FormField';

const FormInputGroup = ({
  children,
  ...props
}) => (
  <FormField {...props}>
    {(p) => (
      <div
        className={`
            input-group input-group-input
            ${p.invalid ? 'is-invalid' : ''}
            ${p.valid ? 'is-valid' : ''}
        `}
      >
        {children(p)}
      </div>
    )}
  </FormField>
);

export default FormInputGroup;
