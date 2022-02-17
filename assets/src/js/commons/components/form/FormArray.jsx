import React from 'react';
import { FieldArray, useField } from 'formik';
import {
  DragDropContext, Droppable,
} from 'react-beautiful-dnd';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import FormField from './FormField';
import useUniqKey from '../../hooks/useUniqKey';
import FormArrayItem from './FormArrayItem';

const FormArray = ({
  defaults,
  max,
  children,
  title,
  tmpl,
  sortable = true,
  ...props
}) => {
  const [{ value }] = useField(props.name);
  const [key, newKey] = useUniqKey();

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

            const list = value.map((item, i) => (
              <FormArrayItem
                key={item.key}
                helpers={h}
                array={value}
                index={i}
                item={item}
                title={title}
                tmpl={tmpl}
                sortable={sortable}
              >
                {children}
              </FormArrayItem>
            ));

            return (
              <div>
                {sortable ? (
                  <DragDropContext
                    onDragEnd={({ source, destination }) => {
                      h.swap(source.index, destination.index);
                    }}
                  >
                    <Droppable
                      droppableId={key}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {list}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                ) : list}
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
