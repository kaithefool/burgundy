import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import env from '../../config/env';

const { lngs, lngLabels } = env;

const BtnLng = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const setCookie = (l) => {
    Cookies.set('i18next', l, {
      expires: 365,
      sameSite: 'strict',
      secure: window.location.protocol === 'https:',
    });
  };

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
              setCookie(l);
            }}
            disabled={language === l}
          >
            {lngLabels[i] || l}
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default BtnLng;
