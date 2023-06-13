import React, { useState } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

import { useField } from 'formik';
import List from '../list';
import useEventListener from '../../hooks/useEventListener';

const FormRefSearch = ({
  limit = 6,
  filter,
  unique = true,
  onPicked = () => {},
  children,
  invalid,
  valid,
  name,
  placeholder,
  ...props
}) => {
  const [showOpts, setShowOpts] = useState(false);
  const [{ value }] = useField(name);
  let excl = null;

  if (Array.isArray(value)) {
    if (value.length) excl = value.map((r) => r._id);
  } else if (value) {
    excl = [value._id];
  }

  let className = '';

  if (valid) className = 'is-valid';
  if (invalid) className = 'is-invalid';

  useEventListener(window, 'click', () => setShowOpts(false));

  return (
    <List
      initQuery={{ limit }}
      filter={{
        ...filter,
        ...unique && excl && {
          excl: [...excl, ...filter?.excl || []],
        },
      }}
      history={false}
      {...props}
    >
      {({ rows }) => (
        <List.Search
          className={className}
          placeholder={placeholder}
          onFocus={() => setShowOpts(true)}
          onClick={(e) => e.stopPropagation()}
        >
          {!!rows?.length && (
            <div className={`
              list-group list-group-flush
              mx-2 border-top
              ${showOpts ? '' : 'd-none'}
            `}
            >
              {rows.map((r) => (
                <button
                  key={r._id}
                  type="button"
                  className="list-group-item list-group-item-action py-2"
                  onClick={() => {
                    onPicked(r);
                    setShowOpts(false);
                  }}
                >
                  <div className="row">
                    <div className="col-auto ps-0 pe-2">
                      <FA icon={faPlusCircle} fixedWidth />
                    </div>
                    <div className="col">
                      {children(r)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </List.Search>
      )}
    </List>
  );
};

export default FormRefSearch;
