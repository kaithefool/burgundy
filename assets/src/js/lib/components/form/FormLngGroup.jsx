import React, { useState } from 'react';

import env from '../../config/env';
import FormField from './FormField';
import FormInputGroup from './FormInputGroup';
import { mapLng } from '../../helpers';

const { lngs } = env;

const FormLngGroup = ({
  children,
  block = false,
  ...props
}) => {
  const [lng, setLng] = useState(() => lngs[0]);

  if (block) {
    return (
      <FormField {...props}>
        {(p) => (
          <>
            <div className="mb-2">
              <div className="btn-group">
                {mapLng((l, label, flag) => (
                  <button
                    key={l}
                    type="button"
                    className={`
                      btn btn-sm btn-outline-neutral
                      ${lng === l ? 'active' : ''}
                    `}
                    onClick={() => setLng(l)}
                  >
                    {flag}
                    {' '}
                    {label || l}
                  </button>
                ))}
              </div>
            </div>
            {typeof children === 'function' ? children(lng, p) : children}
          </>
        )}
      </FormField>
    );
  }

  return (
    <FormInputGroup {...props}>
      {(p) => (
        <>
          <select
            className="form-select flex-auto"
            value={lng}
            onChange={(evt) => setLng(evt.target.value)}
          >
            {mapLng((l, label, flag) => (
              <option
                key={l}
                value={l}
              >
                {flag}
                {' '}
                {label || l}
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
