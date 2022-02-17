import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

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
  const context = {
    helpers,
    array,
    index,
    item,
    title: title(index, item),
    sortable,
    children: children(index, item, helpers),
  };
  let Tag = ({ children: c }) => c;

  if (tmpl === 'formset') Tag = FormArrayItemFormset;
  if (tmpl === 'list') Tag = FormArrayItemList;

  if (sortable) {
    return (
      <Draggable
        draggableId={item.key}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Tag
              {...context}
              dragHandleProps={provided.dragHandleProps}
              isDragging={snapshot.isDragging}
            />
          </div>
        )}
      </Draggable>
    );
  }

  return (
    <Tag {...context} />
  );
};

export default FormArrayItem;
