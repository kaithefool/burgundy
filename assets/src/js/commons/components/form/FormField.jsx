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

  const l = label !== null && (
    <label
      htmlFor={id.current}
      className={isFormCheck ? 'form-check-label' : 'form-label'}
    >
      {label || startCase(name)}
    </label>
  );

  return (
    <div className={`
      ${className}
      ${isFormCheck ? 'form-check' : ''}
      ${type === 'switch' ? 'form-switch' : ''}
    `}>
      {!isFormCheck && l}
      <Field
        className={`
          ${isFormCheck ? 'form-check-input' : 'form-control'}
          ${touched && error ? 'is-invalid' : ''}
          ${isAffirmed ? 'is-valid' : ''}
        `}
        type={type === 'switch' ? 'checkbox' : type}
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
