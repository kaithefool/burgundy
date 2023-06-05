import React from 'react';
import {
  useField, useFormikContext,
} from 'formik';

import FormField from './FormField';
import FilsCoverImg from '../fils/FilsCoverImg';

const FormFilsCoverImg = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);
  const { submitCount } = useFormikContext();

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FilsCoverImg
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

export default FormFilsCoverImg;
