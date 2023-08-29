import React from 'react';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { mapDeep } from '../../../helpers';
import useList from '../useList';

const compKeys = ['gt', 'gte', 'lt', 'lte', 'in'];

const ListFltTags = ({
  className = 'bg-primary text-white rounded-1',
  label,
}) => {
  const { t } = useTranslation();
  const { query: { filter = {} }, fetch } = useList();
  const tags = [];

  mapDeep(filter, (val, key, path) => {
    if (typeof key === 'number') {
      const p = path.replace(/\.\d+$/, '');

      tags.push({
        path, label: `${p}: ${val}`,
      });
    }
    if (compKeys.includes(key)) {
      const p = path.replace(new RegExp(`\\.${key}$`), '');

      tags.push({
        path, label: `${p}: ${t(key)} ${val}`,
      });
    }

    return val;
  });

  return (
    <div className="row g-2">
      {tags.map((ta) => (
        <div key={ta.path} className="col-auto">
          <div className={`
            d-flex align-items-center
            ${className}
          `}
          >
            <div className="ps-2">
              {ta.label}
            </div>
            <button
              type="button"
              className="btn btn-sm text-reset"
              onClick={() => {
                fetch(omit(filter, ta.path));
              }}
            >
              <FA icon={faTimes} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFltTags;
