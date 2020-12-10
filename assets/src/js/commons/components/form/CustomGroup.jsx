import React, { useRef } from 'react';
import startCase from 'lodash/startCase';

import Field from './Field.jsx';

let k = 0;

const CustomGroup = ({
  label,
  type,
  ...props
}) => {
  const id = useRef(() => { k += 1; return `custom-${k}`; });

  return (
    <div className={`custom-control custom-${type}`}>
      <Field
        id={id}
        type={type === 'switch' ? 'checkbox' : type}
        {...props}
      />
      <label htmlFor={id} className="custom-control-label">
        {label || startCase(props.name)}
      </label>
    </div>
  );
};

export default CustomGroup;
