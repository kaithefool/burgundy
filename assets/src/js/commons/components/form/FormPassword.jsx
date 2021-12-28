import React, { useState } from 'react';
import {
  Field,
} from 'formik';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import FormField from './FormField';

const FormPassword = ({
  fieldClassName = 'form-control',
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <div
          className={`
            input-group shared-border
            ${invalid ? 'is-invalid' : ''}
            ${valid ? 'is-valid' : ''}
        `}
        >
          <Field
            className={`
              ${fieldClassName}
              ${invalid ? 'is-invalid' : ''}
              ${valid ? 'is-valid' : ''}
            `}
            {...{ ...p, children }}
            type={visible ? 'text' : 'password'}
          />
          <button
            type="button"
            className="btn btn-input"
            onClick={() => setVisible(!visible)}
          >
            <FA icon={visible ? faEyeSlash : faEye} fixedWidth />
          </button>
        </div>
      )}
    </FormField>
  );
};

export default FormPassword;
