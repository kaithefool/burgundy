import React from 'react';
import { useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import List from '../list';
import FormField from './FormField';

const FormRef = ({
  limit = 6,
  filter,
  children,
  ...props
}) => {
  const [{ value },, { setTouched, setValue }] = useField(props.name);
  const set = (v) => {
    setValue(v);
    setTouched();
  };

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <List
          initQuery={{ limit }}
          filter={{
            ...filter,
            ...value && { excl: value._id },
          }}
          history={false}
          lazy
          {...p}
        >
          {({ rows }) => (
            <>
              {value && (
                <div className="input-group mb-2">
                  <div className="input-group-text flex-fill">
                    {children(value)}
                  </div>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => set(null)}
                  >
                    <FA icon={faTimes} />
                  </button>
                </div>
              )}
              {!value && (
                <>
                  <List.Search />
                  {!!rows && (
                  <div className="list-group my-2">
                    {rows.map((r) => (
                      <button
                        key={r._id}
                        type="button"
                        className="list-group-item list-group-item-action"
                        onClick={() => set(r)}
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
            </>
          )}
        </List>
      )}
    </FormField>
  );
};

export default FormRef;
