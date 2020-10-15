import React, { useRef } from 'react';
import startCase from 'lodash/startCase';

import Field from './Field.jsx';

let k = 0;

const FormGroup = ({
  label,
  ...props
}) => {
  const id = useRef(() => { k += 1; return `form-group-${k}`; });

  return (
    <div
      className="form-group"
    >
      <label htmlFor={id}>
        {label || startCase(props.name)}
      </label>
      <Field {...props} />
    </div>
  );
};

export default FormGroup;
