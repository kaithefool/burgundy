import React, { useState } from 'react';

import env from '../../config/env';
import FormInputGroup from './FormInputGroup';

const { lngs, lngLabels, lngFlags } = env;

const FormLngGroup = ({
  children,
  ...props
}) => {
  const [lng, setLng] = useState(() => lngs[0]);

  return (
    <FormInputGroup {...props}>
      {(p) => (
        <>
          <select
            className="form-select flex-auto"
            value={lng}
            onChange={(evt) => setLng(evt.target.value)}
          >
            {lngs.map((l, i) => (
              <option
                key={l}
                value={l}
              >
                {lngFlags[i]}
                {' '}
                {lngLabels[i] || l}
              </option>
            ))}
          </select>
          {typeof children === 'function' ? children(lng, p) : children}
        </>
      )}
    </FormInputGroup>
  );
};

export default FormLngGroup;
