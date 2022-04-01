import React from 'react';

import FormArrayItemList from './FormArrayItemList';
import FormArrayItemFormset from './FormArrayItemFormset';

const FormArrayItem = ({
  helpers,
  array,
  index,
  item,
  tmpl = 'formset',
  sortable,
  children,
  title = (i) => `${i + 1}.`,
}) => {
  let Tag = ({ children: c }) => c;

  if (tmpl === 'formset') Tag = FormArrayItemFormset;
  if (tmpl === 'list') Tag = FormArrayItemList;

  return (
    <Tag
      {...{
        helpers,
        array,
        index,
        item,
        title: typeof title === 'function' ? title(index, item) : title,
        sortable,
        children: children(index, item, helpers),
      }}
    />
  );
};

export default FormArrayItem;
