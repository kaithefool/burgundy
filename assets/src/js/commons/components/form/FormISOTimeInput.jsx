import React from 'react';
import { DateTime as dt } from 'luxon';
import { useField } from 'formik';

import FormField from './FormField';

const FormISOTimeInput = ({
  zone,
  datetime = false,
  ...props
}) => {
  const { name } = props;
  const [
    field, { value }, { setValue },
  ] = useField(name);
  let { min, max } = props;

  if (min && min instanceof dt) {
    min = min.toFormat('HH:mm');
  }
  if (max && max instanceof dt) {
    max = max.toFormat('HH:mm');
  }

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <input
          {...{
            ...field, ...p, min, max,
          }}
          type="time"
          onChange={(evt) => {
            const { value: v } = evt.target;
            const d = value ? dt.fromISO(value, { zone }) : dt.now();
            const t = dt.fromISO(v, { zone });

            if (!v) {
              return setValue('');
            }

            if (datetime) {
              const { hour, minute } = t;

              return setValue(d.set({ hour, minute }).toISO());
            }

            return setValue(d.toISOTime());
          }}
          value={
            value
              ? dt.fromISO(value, { zone }).toFormat('HH:mm')
              : ''
            }
        />
      )}
    </FormField>
  );
};

export default FormISOTimeInput;
