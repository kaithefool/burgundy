import React from 'react';
import {
  useField, useFormikContext,
} from 'formik';

import FormField from './FormField';
import FilsList from '../fils/FilsList';

const FormFilsList = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);
  const { submitCount } = useFormikContext();

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FilsList
          initValue={value}
          reset={!submitCount}
          onChange={(v) => {
            setValue(v);
            setTouched();
          }}
          {...p}
        />
      )}
    </FormField>
  );
};

export default FormFilsList;
