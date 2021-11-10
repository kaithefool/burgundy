import React from 'react';
import {
  Field,
} from 'formik';

import FormField from './FormField';

const FormInput = ({
  fieldClassName = 'form-control',
  children,
  ...props
}) => (
  <FormField {...props}>
    {({ invalid, valid, ...p }) => (
      <Field
        className={`
          ${fieldClassName}
          ${invalid ? 'is-invalid' : ''}
          ${valid ? 'is-valid' : ''}
        `}
        {...{ ...p, children }}
      />
    )}
  </FormField>
);

export default FormInput;
