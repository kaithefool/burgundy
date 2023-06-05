import React from 'react';
import { useField } from 'formik';

import FormField from './FormField';
import AutoGrowTextarea from '../inputs/AutoGrowTextarea';

const FormTextarea = ({
  ...props
}) => {
  const [field] = useField(props);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <AutoGrowTextarea
          {...{ ...field, ...p }}
        />
      )}
    </FormField>
  );
};

export default FormTextarea;
