import React from 'react';
import { useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import List from '../list';

const FormRefSearch = ({
  limit = 6,
  filter,
  unique = true,
  onPicked = () => {},
  children,
  ...props
}) => {
  const [{ value }] = useField(props.name);
  let excl = null;

  if (Array.isArray(value)) {
    if (value.length) excl = value.map((r) => r._id);
  } else if (value) {
    excl = value._id;
  }

  return (
    <List
      initQuery={{ limit }}
      filter={{
        ...filter,
        ...unique && excl && { excl },
      }}
      history={false}
      lazy
      {...props}
    >
      {({ rows }) => (
        <>
          <List.Search />
          {!!rows && (
          <div className="list-group my-2">
            {rows.map((r) => (
              <button
                key={r._id}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => onPicked(r)}
              >
                <div className="row">
                  <div className="col">
                    {children(r)}
                  </div>
                  <div className="col-auto">
                    <FA icon={faPlus} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          )}
        </>
      )}
    </List>
  );
};

export default FormRefSearch;
