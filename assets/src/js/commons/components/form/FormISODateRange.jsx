import React, { useEffect } from 'react';
import { useField } from 'formik';
import { DateTime as dt } from 'luxon';

import FormField from './FormField';
import FormISODate from './FormISODate';

const FormISODateRange = ({
  ...props
}) => {
  const { name } = props;
  let { min } = props;
  const [,, { setValue: setTo }] = useField(`${name}.to`);
  const [{ value }] = useField(name);
  let { from, to } = value;

  from = from ? dt.fromISO(from) : from;
  to = to ? dt.fromISO(to) : to;

  if (min && !(min instanceof dt)) {
    min = dt.fromISO(min);
  }

  // make sure "to" always later than "from"
  useEffect(() => {
    if (from && to && from > to) {
      setTo(from.toISO());
    }
  }, [value.from]);

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
          <FormISODate
            {...p}
            name={`${name}.from`}
            fieldOnly
          />
          <span className="input-group-text">
            —
          </span>
          <FormISODate
            {...p}
            name={`${name}.to`}
            min={from > min ? from : min}
            fieldOnly
          />
        </div>
      )}
    </FormField>
  );
};

export default FormISODateRange;
