import React from 'react';
import omit from 'lodash/omit';
import inflect from 'inflect';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { mapDeep } from '../../../helpers';
import useList from '../useList';

const compKeys = ['gt', 'gte', 'lt', 'lte', 'in'];
const compSymbols = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
};

const Label = ({
  value, field, comparsion,
  paths = true, // custom path label,
  values = () => false, // custom value label
}) => {
  const { t } = useTranslation();
  let f;

  if (
    paths
    && (
      typeof paths !== 'function'
      || paths({ value, path: field, comparsion })
    )
  ) {
    f = t('field', {
      path: field,
      fieldCase: 'titleize',
      fieldArrayPath: false,
    });
  }

  const vv = (v) => {
    const d = values({ value: v, path: field, comparsion });

    if (d) return d;

    return t([
      `${field}.${v}`,
      `${inflect.pluralize(field)}.${v}`,
      v,
    ]);
  };
  const val = [
    ...[compSymbols[comparsion]].filter((s) => s),
    Array.isArray(value) ? value.map(vv).join(', ') : vv(value),
  ].join(' ');

  return f ? `${f}: ${val}` : val;
};

const ListFltTags = ({
  className = 'bg-secondary text-white rounded-1',
  children = (tag) => <Label {...tag} />,
  lists, // list array values inside tag
  ...props
}) => {
  const { query: { filter = {} }, fetch } = useList();
  const tags = [];

  mapDeep(filter, (value, key, path) => {
    if (
      Array.isArray(value)
      && lists
      && (
        typeof lists !== 'function'
        || lists({ value, key, path })
      )
    ) {
      tags.push({ path, value, field: path });

      return null;
    } if (typeof key === 'number') {
      tags.push({ path, value, field: path.replace(/\.\d+$/, '') });
    } else if (compKeys.includes(key)) {
      const field = path.replace(new RegExp(`\\.${key}$`), '');

      tags.push({
        path, value, field, comparsion: key,
      });
    } else if (typeof value === 'string') {
      tags.push({ path, value, field: path });
    }

    return value;
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
              {children({ ...ta, ...props })}
            </div>
            <button
              type="button"
              className="btn btn-sm text-reset"
              onClick={() => {
                fetch({
                  filter: omit(filter, ta.path),
                });
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
