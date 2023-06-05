import React from 'react';
import { DateTime as dt } from 'luxon';
import { useField } from 'formik';

import FormField from './FormField';

const FormISODate = ({
  startOf,
  endOf,
  datetime = false,
  zone,
  ...props
}) => {
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
            const t = value
              ? dt.fromISO(value, { zone })
              : dt.now().startOf('day');

            if (!v) {
              return setValue('');
            }

            const { hour, minute } = t;
            let d = dt.fromISO(v, { zone });

            if (datetime) d = d.set({ hour, minute });
            if (startOf) d = d.startOf(startOf);
            if (endOf) d = d.endOf(endOf);

            return setValue(d.toISO());
          }}
          value={
            value
              ? dt.fromISO(value, { zone }).toISODate()
              : ''
            }
        />
      )}
    </FormField>
  );
};

export default FormISODate;
