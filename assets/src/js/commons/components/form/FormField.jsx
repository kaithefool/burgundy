import React, { useRef } from 'react';
import {
  Field,
  useField,
  ErrorMessage,
} from 'formik';
import startCase from 'lodash/startCase';

let k = 0;

const FormField = ({
  label,
  type,
  className = 'mb-3',
  helpText,
  affirm = false,
  ...props
}) => {
  const { name } = props;
  const [, { error, touched }] = useField(name);
  const id = useRef(() => { k += 1; return `form-field-${k}`; });
  const isFormCheck = ['checkbox', 'radio', 'switch'].includes(type);
  const isAffirmed = affirm && touched && !error;

  const t = type === 'switch' ? 'checkbox' : type;

  const c = [
    isFormCheck ? 'form-check-input' : 'form-control',
    type === 'switch' && 'form-switch',
    touched && error && 'is-invalid',
    isAffirmed && 'is-valid',
  ].filter((s) => s).join(' ');

  const l = label !== null && (
    <label
      htmlFor={id.current}
      className={isFormCheck ? 'form-check-label' : 'form-label'}
    >
      {label || startCase(name)}
    </label>
  );

  return (
    <div className={`${className} ${isFormCheck ? 'form-check' : ''}`}>
      {!isFormCheck && l}
      <Field
        className={c}
        type={t}
        {...props}
      />
      {isFormCheck && l}
      {isAffirmed && typeof affirm !== 'boolean' && (
        <div className="valid-feedback">{affirm}</div>
      )}
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="invalid-feedback">{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default FormField;
