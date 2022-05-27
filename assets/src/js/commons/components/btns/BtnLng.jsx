import React from 'react';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import env from '../../config/env';

const { lngs, lngLabels } = env;

const BtnLng = ({
  className = '',
  fieldClassName = 'border-0 bg-transparent',
}) => {
  const { i18n } = useTranslation();
  const id = 'lng';

  if (lngs.length < 2) return '';

  return (
    <div className={className}>
      <div className="input-group input-group-sm">
        <label
          htmlFor={id}
          className={`input-group-text bg-white ${fieldClassName}`}
        >
          <FA icon={faGlobeAmericas} />
        </label>
        <select
          id={id}
          className={`form-select ${fieldClassName}`}
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
    </div>
  );
};

export default BtnLng;
