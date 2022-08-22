import React from 'react';

import FormRefSearch from './FormRefSearch';
import FormRefItem from './FormRefItem';
import FormArray from './FormArray';

const FormRefs = ({ children, ...props }) => (
  <FormArray
    {...props}
    tmpl={({
      item, helpers, index, sortable,
    }) => (
      <FormRefItem
        value={item}
        onRemoved={() => helpers.remove(index)}
        sortable={sortable}
      >
        {children}
      </FormRefItem>
    )}
    pushBtn={({ helpers, defaults, ...p }) => (
      <FormRefSearch
        {...p}
        onPicked={(v) => helpers.push(v)}
      >
        {children}
      </FormRefSearch>
    )}
  />
);

export default FormRefs;
