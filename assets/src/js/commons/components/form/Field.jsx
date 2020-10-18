import React from 'react';
import {
  Field as FormikField,
  useField,
  ErrorMessage,
} from 'formik';

const Field = ({
  id,
  helpText,
  className,
  affirm = false,
  as,
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
    <>
      <FormikField className={c} {...props} />
      {helpText && (
        <small className="form-text text-muted">
          {helpText}
        </small>
      )}
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="invalid-feedback">{msg}</div>
        )}
      </ErrorMessage>
    </>
  );
};

export default Field;
