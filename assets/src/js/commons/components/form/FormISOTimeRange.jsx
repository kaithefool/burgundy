import React, { useEffect } from 'react';
import { useField } from 'formik';
import { DateTime as dt } from 'luxon';

import FormInputGroup from './FormInputGroup';
import FormISOTime from './FormISOTime';

const FormISOTimeRange = ({
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
      setTo(from.toISOTime());
    }
  }, [value.from]);

  return (
    <FormInputGroup {...props}>
      {(p) => (
        <>
          <FormISOTime
            {...p}
            name={`${name}.from`}
            fieldOnly
          />
          <span className="input-group-text">
            —
          </span>
          <FormISOTime
            {...p}
            name={`${name}.to`}
            min={(from > min || !min ? from : min) || undefined}
            fieldOnly
          />
        </>
      )}
    </FormInputGroup>
  );
};

export default FormISOTimeRange;
