import React from 'react';
import {
  useField,
} from 'formik';

import FormField from './FormField';
import FilsAvatar from '../fils/FilsAvatar';

const FormFilsAvatar = ({
  className = 'mb-3',
  ...props
}) => {
  const [, { value }, { setTouched, setValue }] = useField(props);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FilsAvatar
          initValue={value}
          onChange={(v) => {
            setValue(v);
            setTouched();
          }}
          {...p}
          className={className}
        />
      )}
    </FormField>
  );
};

export default FormFilsAvatar;
