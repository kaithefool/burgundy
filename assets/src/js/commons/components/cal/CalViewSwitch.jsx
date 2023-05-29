import React from 'react';
import { useTranslation } from 'react-i18next';
import inflect from 'inflect';

import useCal from './useCal';

const CalViewSwitch = () => {
  const { query: { view }, views, fetch } = useCal();
  const { t } = useTranslation();

  return (
    <div className="btn-group">
      {views.map((v) => (
        <button
          key={v}
          type="button"
          className={`
            btn btn-sm
            ${view === v ? 'btn-primary' : 'btn-outline-primary'}
          `}
          onClick={() => fetch({ view: v })}
        >
          {inflect.titleize(t(v))}
        </button>
      ))}
    </div>
  );
};

export default CalViewSwitch;
