import React from 'react';
import {
  useField,
} from 'formik';

import FormField from './FormField';
import FilsCoverImg from '../fils/FilsCoverImg';

const FormFilsCoverImg = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FilsCoverImg
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

export default FormFilsCoverImg;
