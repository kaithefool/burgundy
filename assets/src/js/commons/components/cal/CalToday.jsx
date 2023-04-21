import React from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime as dt } from 'luxon';
import inflect from 'inflect';

import useCal from './useCal';

const CalToday = () => {
  const { t } = useTranslation();
  const { fetch, query: { view } } = useCal();

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary"
      onClick={() => fetch({ date: dt.now().startOf(view) })}
    >
      {inflect.titleize(t('today'))}
    </button>
  );
};

export default CalToday;
