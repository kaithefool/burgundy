import React from 'react';
import { Field } from 'formik';

import FormField from './FormField';

const FormInput = ({
  children,
  ...props
}) => (
  <FormField {...props}>
    {({ invalid, valid, ...p }) => (
      <Field
        {...{ ...p, children }}
      />
    )}
  </FormField>
);

export default FormInput;
