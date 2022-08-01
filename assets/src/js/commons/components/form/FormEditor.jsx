import React from 'react';

import { useField } from 'formik';

import FormField from './FormField';
import Slate from '../inputs/slate/Slate';
import Summernote from '../inputs/Summernote';

const FormEditor = ({
  slate = false,
  ...props
}) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {() => (slate ? (
        <Slate
          initValue={value}
          onChange={(v) => setValue(v)}
          onBlur={setTouched}
        />
      ) : (
        <Summernote
          initValue={value}
          onChange={(v) => setValue(v)}
          onBlur={setTouched}
        />
      ))}
    </FormField>
  );
};

export default FormEditor;
