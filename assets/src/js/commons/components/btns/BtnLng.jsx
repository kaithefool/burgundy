import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import env from '../../config/env';

const { lngs, lngLabels } = env;

const BtnLng = ({ className = '' }) => {
  const { i18n } = useTranslation();

  if (lngs.length < 2) return '';

  return (
    <div className={className}>
      {lngs.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && '/'}
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={() => {
              i18n.changeLanguage(l);
            }}
            disabled={i18n.language === l}
          >
            {lngLabels[i] || l}
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default BtnLng;
