import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import FormInputGroup from './FormInputGroup';
import FormInput from './FormInput';

const FormPassword = ({
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormInputGroup {...props}>
      {({ valid, invalid, ...p }) => (
        <>
          <FormInput
            {...{ ...p, children }}
            type={visible ? 'text' : 'password'}
            fieldOnly
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
