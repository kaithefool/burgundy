import React, { useRef } from 'react';
import startCase from 'lodash/startCase';

let k = 0;

const Custom = ({
  label,
  type,
  props,
}) => {
  const id = useRef(() => { k += 1; return `custom-${k}`; });

  return (
    <div className={`custom-control custom-${type}`}>
      <input
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

export default Custom;
