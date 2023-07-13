import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import env from '../../config/env';

const { lngs, lngLabels } = env;

const BtnLng = ({
  className = 'px-3',
  showLabel = false,
}) => {
  const { i18n } = useTranslation();
  const id = 'lng';

  if (lngs.length < 2) return '';

  return (
    <div className="position-relative">
      <div className={className}>
        <FA icon={faGlobeAmericas} fixedWidth />
        {showLabel && (
          <span className="ps-2">
            {lngLabels[lngs.indexOf(i18n.language)] || 0}
          </span>
        )}
      </div>
      <select
        id={id}
        className={`
          position-absolute w-100 h-100 start-0 top-0
          opacity-0 cursor-pointer
        `}
        value={i18n.language}
        onChange={(evt) => i18n.changeLanguage(evt.target.value)}
      >
        {lngs.map((l, i) => (
          <option
            key={l}
            value={l}
          >
            {lngLabels[i] || l}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BtnLng;
