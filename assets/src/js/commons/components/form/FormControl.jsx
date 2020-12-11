import React from 'react';
import {
  Field,
  useField,
} from 'formik';

const FormControl = ({
  className,
  affirm = false,
  ...props
}) => {
  const { name } = props;
  const [, { error, touched }] = useField(name);

  const c = [
    'form-control',
    className,
    touched && error && 'is-invalid',
    affirm && touched && !error && 'is-valid',
  ]
    .filter((s) => s)
    .join(' ');

  return (
    <Field className={c} {...props} />
  );
};

export default FormControl;
