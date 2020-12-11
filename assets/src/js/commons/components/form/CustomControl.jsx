import React, { useState } from 'react';
import startCase from 'lodash/startCase';

import { Field } from 'formik';

let k = 0;

const CustomControl = ({
  label,
  type,
  className = '',
  ...props
}) => {
  const [id] = useState(() => { k += 1; return `custom-${k}`; });

  return (
    <div className={`custom-control custom-${type}`}>
      <Field
        id={id}
        type={type === 'switch' ? 'checkbox' : type}
        className={`custom-control-input ${className}`}
        {...props}
      />
      <label htmlFor={id} className="custom-control-label">
        {label || startCase(props.name)}
      </label>
    </div>
  );
};

export default CustomControl;
