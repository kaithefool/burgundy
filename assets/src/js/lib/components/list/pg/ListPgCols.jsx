import React from 'react';
import startCase from 'lodash/startCase';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { useTranslation } from 'react-i18next';

import useList from '../useList';

const ListColsToggle = () => {
  const { t } = useTranslation();
  const { cols, activeCols, showCols } = useList();

  const isChecked = (key) => (
    activeCols.find((c) => c.key === key) !== undefined
  );

  const toggle = (key, active) => {
    if (active) {
      showCols(cols.filter((c) => (
        c.key === key || isChecked(c.key)
      )));
    } else {
      showCols(activeCols.filter((c) => c.key !== key));
    }
  };

  return (
    <DropdownButton
      title={<FA icon={faTable} />}
      variant=""
    >
      {cols.map((c) => (
        <li key={c.key} className="dropdown-item">
          <div className="form-check">
            <input
              id={`col-${c.key}`}
              type="checkbox"
              className="form-check-input me-2"
              checked={isChecked(c.key)}
              onChange={(e) => toggle(c.key, e.target.checked)}
            />
            <label
              htmlFor={`col-${c.key}`}
              className="form-check-label"
            >
              {c.label || t(`${c.key}`, startCase(c.key))}
            </label>
          </div>
        </li>
      ))}
    </DropdownButton>
  );
};

export default ListColsToggle;
