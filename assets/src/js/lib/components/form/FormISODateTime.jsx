import React from 'react';

import FormInputGroup from './FormInputGroup';
import FormISODate from './FormISODate';
import FormISOTime from './FormISOTime';

const FormISODateTime = (props) => (
  <FormInputGroup {...props}>
    {(p) => (
      <>
        <FormISODate
          {...p}
          fieldOnly
          datetime
        />
        <FormISOTime
          {...p}
          as="input"
          datetime
          fieldOnly
        />
      </>
    )}
  </FormInputGroup>
);

export default FormISODateTime;
