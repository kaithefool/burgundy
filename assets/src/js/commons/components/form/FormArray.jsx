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
import { initArrayItem } from './helpers';

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
  const [key] = useUniqKey();
  const isObjs = typeof defaults === 'object';
  const isSortable = sortable && isObjs;

  return (
    <FormField {...props}>
      {({ invalid, valid, ...p }) => (
        <FieldArray name={p.name}>
          {(helpers) => {
            const h = isObjs ? {
              ...helpers,
              push: (item) => helpers.push(initArrayItem(item)),
              insert: (i, item) => helpers.insert(i, initArrayItem(item)),
              unshift: (item) => helpers.unshift(initArrayItem(item)),
              replace: (i, item) => helpers.replace(i, initArrayItem(item)),
            } : helpers;

            const list = value.map((item, i) => (
              <FormArrayItem
                key={item.key || i}
                helpers={h}
                array={value}
                index={i}
                item={item}
                title={title}
                tmpl={tmpl}
                sortable={isSortable}
              >
                {children}
              </FormArrayItem>
            ));

            return (
              <div>
                {isSortable ? (
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
