import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faThList } from '@fortawesome/free-solid-svg-icons/faThList';

import Dir from './dir';
import FilsListItem from './FilsListItem';

const SortableItem = SortableElement((props) => (
  <FilsListItem {...props} dragHandle />
));

const List = ({ files, sortable, mode }) => {
  const Item = sortable ? SortableItem : FilsListItem;

  return (
    <div className="row g-2">
      {files.map((f, i) => (
        <Item
          className={mode === 'grid' ? 'col-xs-6 col-2' : ''}
          key={f.key}
          file={f}
          mode={mode}
          index={i}
        />
      ))}
    </div>
  );
};

const SortableList = SortableContainer((props) => (
  <List {...props} sortable />
));

const FilsList = ({
  sortable = true,
  modes = ['list', 'grid'],
  ...props
}) => {
  const [mode, setMode] = useState(modes[0]);

  return (
    <Dir {...props}>
      {({ files, move, multiple }) => (
        <Dir.Drop className="position-relative">
          <div className="row gx-2">
            {/* click to add files */}
            <div className="col">
              <Dir.Click className="d-grid">
                <div className="btn btn-secondary px-3 text-start">
                  <FA icon={faPlus} fixedWidth className="me-2" />
                  Add or drag files
                </div>
              </Dir.Click>
            </div>

            {/* mode toggle */}
            {modes.length > 1 && multiple && (
              <div className="col-auto">
                <div className="btn-group">
                  <button
                    type="button"
                    tabIndex={-1}
                    className={
                    `btn btn${mode === 'list' ? '' : '-outline'}-secondary`
                  }
                    onClick={() => setMode('list')}
                  >
                    <FA icon={faThList} />
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    className={
                    `btn btn${mode === 'grid' ? '' : '-outline'}-secondary`
                  }
                    onClick={() => setMode('grid')}
                  >
                    <FA icon={faTh} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* list */}
          <div className="py-2">
            {sortable ? (
              <SortableList
                files={files}
                mode={mode}
                onSortEnd={({ oldIndex, newIndex }) => move(oldIndex, newIndex)}
                axis={mode === 'grid' ? 'xy' : 'y'}
                useDragHandle
              />
            ) : (
              <List files={files} mode={mode} />
            )}
          </div>
        </Dir.Drop>
      )}
    </Dir>
  );
};

export default FilsList;
