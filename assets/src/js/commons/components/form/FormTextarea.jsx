import React from 'react';
import { useField } from 'formik';

import FormField from './FormField';
import AutoGrowTextarea from '../inputs/AutoGrowTextarea';

const FormTextarea = ({
  fieldClassName = 'form-control',
  children,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <AutoGrowTextarea
          className={`
            ${fieldClassName}
            ${invalid ? 'is-invalid' : ''}
            ${valid ? 'is-valid' : ''}
          `}
          {...{ ...field, ...p, children }}
        />
      )}
    </FormField>
  );
};
export default FormTextarea;
