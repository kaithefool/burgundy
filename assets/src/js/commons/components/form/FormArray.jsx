import React from 'react';
import { FieldArray, useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import FormField from './FormField';
import { newKey } from '../../hooks/useUniqKey';

const FormArray = ({
  defaults,
  header = (i) => `${i + 1}.`,
  body,
  max,
  ...props
}) => {
  const [{ value }] = useField(props.name);

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FieldArray name={p.name}>
          {(helpers) => {
            const h = {
              ...helpers,
              push: (item) => helpers.push({
                ...item, key: newKey(),
              }),
              insert: (i, item) => helpers.insert(i, {
                ...item, key: newKey(),
              }),
              unshift: (item) => helpers.unshift({
                ...item, key: newKey(),
              }),
              replace: (i, item) => helpers.replace(i, {
                ...item, key: newKey(),
              }),
            };

            return (
              <div>
                {value.map((item, i) => {
                  const rmBtn = (
                    <button
                      className="btn btn-sm"
                      type="button"
                      onClick={() => h.remove(i)}
                    >
                      <FA icon={faTimes} />
                    </button>
                  );

                  return (
                    <div
                      className="card border-dark bg-light mb-3"
                      key={item.key}
                    >
                      {header && (
                        <div className="card-header">
                          <div className="row">
                            <div className="col">
                              {header(i, item, h)}
                            </div>
                            <div className="col-auto">
                              {rmBtn}
                            </div>
                          </div>
                        </div>
                      )}
                      {body && (
                        <div className="card-body px-4">
                          {header ? (
                            body(i, item, h)
                          ) : (
                            <div className="row">
                              <div className="col">
                                {body(i, item, h)}
                              </div>
                              <div className="col-auto">
                                {rmBtn}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => h.push(defaults)}
                >
                  <FA icon={faPlus} />
                </button>
              </div>
            );
          }}
        </FieldArray>
      )}
    </FormField>
  );
};

export default FormArray;
