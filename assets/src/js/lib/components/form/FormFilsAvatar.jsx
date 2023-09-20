import React from 'react';
import {
  useField, useFormikContext,
} from 'formik';

import FormField from './FormField';
import FilsAvatar from '../fils/FilsAvatar';

const FormFilsAvatar = ({
  className = 'mb-3',
  ...props
}) => {
  const [, { value }, { setTouched, setValue }] = useField(props);
  const { submitCount } = useFormikContext();

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FilsAvatar
          initValue={value}
          reset={!submitCount}
          onChange={(v) => {
            setTouched();
            setValue(v);
          }}
          {...p}
          className={className}
        />
      )}
    </FormField>
  );
};

export default FormFilsAvatar;
