import React from 'react';
import { DateTime as dt } from 'luxon';
import { useField } from 'formik';

import FormField from './FormField';

const FormISODate = (props) => {
  const { name } = props;
  const [
    field, { value }, { setValue },
  ] = useField(name);
  let { min, max } = props;

  if (min && min instanceof dt) {
    min = min.toISODate();
  }
  if (max && max instanceof dt) {
    max = max.toISODate();
  }

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <input
          {...{
            ...field, ...p, min, max,
          }}
          type="date"
          onChange={(evt) => {
            const { value: v } = evt.target;

            setValue(v ? dt.fromISO(v).toISO() : v);
          }}
          value={value ? dt.fromISO(value).toISODate() : ''}
        />
      )}
    </FormField>
  );
};

export default FormISODate;
