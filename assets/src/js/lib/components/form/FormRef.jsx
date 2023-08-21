import React from 'react';
import { useField } from 'formik';

import FormField from './FormField';
import FormRefSearch from './FormRefSearch';
import FormRefItem from './FormRefItem';

const FormRef = ({
  children,
  ...props
}) => {
  const [{ value },, { setTouched, setValue }] = useField(props.name);
  const set = (v) => {
    setTouched();
    setValue(v);
  };

  return (
    <FormField {...props}>
      {({ disabled, ...p }) => (
        value ? (
          <FormRefItem
            value={value}
            onRemoved={() => set(null)}
            removeable={!disabled}
          >
            {children}
          </FormRefItem>
        ) : (
          !disabled && (
            <FormRefSearch
              {...p}
              onPicked={set}
            >
              {children}
            </FormRefSearch>
          )
        )
      )}
    </FormField>
  );
};

export default FormRef;
