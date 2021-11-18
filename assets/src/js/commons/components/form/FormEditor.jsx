import React from 'react';

import 'summernote';
import {
  useField,
} from 'formik';

import FormField from './FormField';
import Summernote from './Summernote';

const FormEditor = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {() => (
        <Summernote
          initValue={value}
          onChange={(v) => setValue(v)}
          onBlur={setTouched}
        />
      )}
    </FormField>
  );
};

export default FormEditor;
