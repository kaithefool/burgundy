import React from 'react';
import {
  useField,
} from 'formik';

import FormField from './FormField';
import FilsList from '../fils/FilsList';

const FormFilsList = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FilsList
          initValue={value}
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
