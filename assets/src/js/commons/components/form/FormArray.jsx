import React from 'react';
import { FieldArray, useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import FormField from './FormField';
import { newKey } from '../../hooks/useUniqKey';

const FormArray = ({
  defaults,
  title = (i) => `${i + 1}.`,
  children,
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
                      className="btn"
                      type="button"
                      onClick={() => h.remove()}
                    >
                      <FA icon={faTimes} />
                    </button>
                  );

                  return (
                    <div
                      className="px-4 py-3"
                      key={item.key}
                    >
                      <div className="border-bottom mb-3">
                        <div className="row align-items-center">
                          <div className="col">
                            <strong>
                              {title(i, item, h)}
                            </strong>
                          </div>
                          <div className="col-auto">
                            {rmBtn}
                          </div>
                        </div>
                      </div>

                      {children(i, item, h)}
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
