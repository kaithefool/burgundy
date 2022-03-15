import React from 'react';
import {
  DragDropContext, Droppable, Draggable,
} from 'react-beautiful-dnd';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Dir from './dir';
import FilsListItem from './FilsListItem';
import useUniqKey from '../../hooks/useUniqKey';

const FilsList = ({
  sortable = true,
  ...props
}) => {
  const [key] = useUniqKey();

  return (
    <Dir {...props}>
      {({ files, swap }) => (
        <Dir.Drop className="position-relative">
          <Dir.Click className="d-grid gap-2">
            <div className="btn btn-secondary px-3 text-start">
              <FA icon={faPlus} fixedWidth className="me-2" />
              Add or drag files
            </div>
          </Dir.Click>
          {sortable ? (
            <DragDropContext
              onDragEnd={({ source, destination }) => {
                swap(source.index, destination.index);
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
                    {files.map((f, i) => (
                      <Draggable
                        key={f.key}
                        draggableId={f.key}
                        index={i}
                      >
                        {(childProvided, childSnapshot) => (
                          <div
                            ref={childProvided.innerRef}
                            {...childProvided.draggableProps}
                            className={`
                              py-1
                              ${childSnapshot.isDragging ? 'opacity-50' : ''}
                            `}
                          >
                            <FilsListItem
                              key={f.key}
                              file={f}
                              dragHandleProps={childProvided.dragHandleProps}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            files.map((f) => (
              <div className="py-1" key={f.key}>
                <FilsListItem file={f} />
              </div>
            ))
          )}
        </Dir.Drop>
      )}
    </Dir>
  );
};

export default FilsList;
