import React from 'react';

import { useField } from 'formik';

import FormField from './FormField';
import Summernote from '../inputs/Summernote';
import Html from '../util/Html';

const FormEditor = (props) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {({ disabled }) => (!disabled ? (
        <Summernote
          initValue={value}
          onChange={(v) => setValue(v)}
          onBlur={setTouched}
        />
      ) : (
        <div className="form-control">
          <Html>{value || '&nbsp;'}</Html>
        </div>
      ))}
    </FormField>
  );
};

export default FormEditor;
