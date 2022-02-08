import React from 'react';
import { FieldArray, useField } from 'formik';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import FormField from './FormField';
import { newKey } from '../../hooks/useUniqKey';
import FormArrayItem from './FormArrayItem';

const FormArray = ({
  defaults,
  max,
  children,
  title,
  tmpl,
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
                {value.map((item, i) => (
                  <FormArrayItem
                    key={item.key}
                    helpers={h}
                    index={i}
                    item={item}
                    title={title}
                    tmpl={tmpl}
                  >
                    {children}
                  </FormArrayItem>
                ))}
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
