import React, { useRef } from 'react';
import { ErrorMessage } from 'formik';
import startCase from 'lodash/startCase';

import FormControl from './FormControl.jsx';

let k = 0;

const FormGroup = ({
  label,
  helpText,
  ...props
}) => {
  const id = useRef(() => { k += 1; return `form-group-${k}`; });
  const { name } = props;

  return (
    <div
      className="form-group"
    >
      <label htmlFor={id}>
        {label || startCase(name)}
      </label>
      <FormControl {...props} />
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
    </div>
  );
};

export default FormGroup;
