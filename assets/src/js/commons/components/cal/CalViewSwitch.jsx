import React from 'react';
import { useTranslation } from 'react-i18next';

import useCal from './useCal';

const CalViewSwitch = () => {
  const { query: { view }, fetch } = useCal();
  const { t } = useTranslation();

  const btn = (type) => (
    <button
      type="button"
      className={`
        btn btn-sm
        ${view === type ? 'btn-primary' : 'btn-outline-primary'}
      `}
      onClick={() => fetch({ view: type })}
    >
      {t(type).toUpperCase()}
    </button>
  );

  return (
    <div className="btn-group">
      {btn('month')}
      {btn('week')}
      {btn('day')}
    </div>
  );
};

export default CalViewSwitch;
