import React, { useMemo } from 'react';
import { DateTime as dt } from 'luxon';
import { useTranslation } from 'react-i18next';

import FormSelect from './FormSelect';

const FormISOTimeSelect = ({
  zone,
  step = '1800',
  ...props
}) => {
  const { i18n } = useTranslation();

  let {
    min = '00:00',
    max = '23:59',
  } = props;

  if (!(min instanceof dt)) min = dt.fromISO(min);
  if (!(max instanceof dt)) max = dt.fromISO(max);

  const options = useMemo(() => {
    const o = [{ value: '' }];
    let c = min.setLocale(i18n.language);

    while (c <= max) {
      o.push({
        label: c.toLocaleString(dt.TIME_SIMPLE),
        value: c.toISOTime(),
      });
      c = c.plus({ seconds: step });
    }

    return o;
  }, [
    i18n.language,
    step,
    min.toFormat('HH:mm'),
    max.toFormat('HH:mm'),
  ]);

  return (
    <FormSelect {...props}>
      {options}
    </FormSelect>
  );
};

export default FormISOTimeSelect;
