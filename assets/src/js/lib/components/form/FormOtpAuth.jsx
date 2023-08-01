import React from 'react';
import { useFormikContext } from 'formik';

import { faMobileAlt } from '@fortawesome/free-solid-svg-icons/faMobileAlt';

import FormInputGroup from './FormInputGroup';
import BtnHttp from '../btns/BtnHttp';
import FormInput from './FormInput';

const FormOtpAuth = ({
  api = {
    url: '/api/otps/auth-mobile',
    method: 'post',
  },
  data = (v) => v.mobile,
  icon = faMobileAlt,
  retry = { waitAfter: 0, always: true },
  children,
  ...props
}) => {
  const { values } = useFormikContext();
  const d = typeof data === 'function' ? data(values) : data;

  return (
    <FormInputGroup {...props}>
      {(p) => (
        <>
          <FormInput
            fieldOnly
            autoComplete="one-time-code"
            {...p}
          />
          <BtnHttp
            className="btn btn-primary"
            icon={icon}
            retry={retry}
            alert={{ success: false }}
            api={{
              ...api,
              data: { ...api.data, ...d },
            }}
          >
            {children}
          </BtnHttp>
        </>
      )}
    </FormInputGroup>
  );
};

export default FormOtpAuth;
