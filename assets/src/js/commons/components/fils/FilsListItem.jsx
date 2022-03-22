import React from 'react';

import Fil from './fil';
import FilsListItemList from './FilsListItemList';
import FilsListItemGrid from './FilsListItemGrid';

const FilsListItem = ({
  file,
  mode = 'list',
  className = '',
  dragHandle,
}) => (
  <div className={className}>
    <Fil file={file}>
      {
        mode === 'list'
          ? <FilsListItemList dragHandle={dragHandle} />
          : <FilsListItemGrid dragHandle={dragHandle} />
      }
    </Fil>
  </div>
);

export default FilsListItem;
