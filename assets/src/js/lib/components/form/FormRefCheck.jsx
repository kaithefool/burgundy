import React from 'react';
import { useField } from 'formik';

import FormCheck from './FormCheck';
import { keyArrayItem } from './helpers';

const RefCheck = ({
  field: { value, onChange, ...field },
  form,
  ...props
}) => {
  const [{ value: array },, { setValue }] = useField(field.name);

  return (
    <input
      {...field}
      {...props}
      checked={!!array.find((r) => r._id === value._id)}
      onChange={(e) => {
        const { checked } = e.target;

        if (checked) {
          setValue([...array, keyArrayItem(value)]);
        } else {
          setValue(array.filter((r) => r._id !== value._id));
        }
      }}
    />
  );
};

const FormRefCheck = (props) => (
  <FormCheck
    {...props}
    component={RefCheck}
  />
);

export default FormRefCheck;
