import React from 'react';

import { useField } from 'formik';

import FormField from './FormField';
import Slate from '../inputs/slate/Slate';

const FormEditor = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {() => (
        <Slate
          initValue={value}
          onChange={(v) => setValue(v)}
          onBlur={setTouched}
        />
      )}
    </FormField>
  );
};

export default FormEditor;
