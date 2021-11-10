import React from 'react';

import FormInput from './FormInput';

const FormSelect = ({
  ...props
}) => (
  <FormInput
    as="select"
    fieldClassName="form-select"
    {...props}
  />
);

export default FormSelect;
