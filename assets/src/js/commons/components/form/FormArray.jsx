import React from 'react';
import { FieldArray, useField } from 'formik';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import FormField from './FormField';
import FormArrayItem from './FormArrayItem';
import { initArrayItem } from './helpers';

const SortableList = SortableContainer((props) => <div {...props} />);
const SortableItem = SortableElement((props) => <div {...props} />);

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

            const child = (item, i) => (
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
            );

            return (
              <div>
                {isSortable ? (
                  <SortableList
                    onSortEnd={({ oldIndex, newIndex }) => (
                      h.swap(oldIndex, newIndex)
                    )}
                    useDragHandle
                  >
                    {value.map((item, i) => (
                      <SortableItem key={item.key} index={i}>
                        {child(item, i)}
                      </SortableItem>
                    ))}
                  </SortableList>
                ) : value.map((item, i) => child(item, i))}
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
