import React from 'react';
import FormISOTimeInput from './FormISOTimeInput';
import FormISOTimeSelect from './FormISOTimeSelect';

const FormISOTime = ({
  as = 'select',
  ...props
}) => {
  const Tag = as === 'select'
    ? FormISOTimeSelect : FormISOTimeInput;

  return <Tag {...props} />;
};

export default FormISOTime;
