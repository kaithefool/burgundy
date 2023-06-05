import React, { useEffect } from 'react';
import { useField } from 'formik';
import { DateTime as dt } from 'luxon';

import FormInputGroup from './FormInputGroup';
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
      setTo(from.endOf('day').toISO());
    }
  }, [value.from]);

  return (
    <FormInputGroup {...props}>
      {(p) => (
        <>
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
            min={from > min || !min ? from : min}
            endOf="day"
            fieldOnly
          />
        </>
      )}
    </FormInputGroup>
  );
};

export default FormISODateRange;
