import React, { useState } from 'react';
import {
  Field,
} from 'formik';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import FormInputGroup from './FormInputGroup';

const FormPassword = ({
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormInputGroup {...props}>
      {(p) => (
        <>
          <Field
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
        </>
      )}
    </FormInputGroup>
  );
};

export default FormPassword;
