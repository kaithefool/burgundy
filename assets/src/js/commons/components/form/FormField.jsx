import React from 'react';
import {
  Field,
  useField,
  ErrorMessage,
} from 'formik';
import startCase from 'lodash/startCase';

import useUniqKey from '../../hooks/useUniqKey';

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
  const [id] = useUniqKey();
  const isFormCheck = ['checkbox', 'radio', 'switch'].includes(type);
  const isAffirmed = affirm && touched && !error;

  const l = label !== null && (
    <label
      htmlFor={id}
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
    `}
    >
      {!isFormCheck && l}
      <Field
        id={id}
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
