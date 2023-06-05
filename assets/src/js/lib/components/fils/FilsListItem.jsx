import React from 'react';

import FilsListItemList from './FilsListItemList';
import FilsListItemGrid from './FilsListItemGrid';

const FilsListItem = ({
  file,
  mode = 'list',
  className = '',
  dragHandle,
}) => (
  <div className={className}>
    {
      mode === 'list'
        ? <FilsListItemList file={file} dragHandle={dragHandle} />
        : <FilsListItemGrid file={file} dragHandle={dragHandle} />
    }
  </div>
);

export default FilsListItem;
